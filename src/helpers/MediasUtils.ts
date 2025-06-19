import ApiService from "@/core/services/ApiService";
import type { MediaDownload } from "@/modules/shared/interfaces/medias/MediaDownload";
import type { MediasDownload } from "@/modules/shared/interfaces/medias/MediasDownload";
import { useQueries, useQuery, type QueryClient } from "@tanstack/vue-query";
import type { UploadUserFile } from "element-plus";
import { ref, computed, type Ref } from "vue";

// Interfaz para el archivo crudo, extendiendo File para mayor claridad.
interface UploadRawFile extends File {
  uid: number;
  /** Función optimizada para obtener los bytes del archivo, con caché interno. */
  bytes: () => Promise<Uint8Array>;
}

// --- CONFIGURACIÓN CENTRALIZADA ---
const CONCURRENT_DOWNLOAD_LIMIT = 5; // Límite de descargas simultáneas para no saturar el navegador/servidor.
const DOWNLOAD_TIMEOUT = 30000; // Timeout de 30 segundos por descarga.
const RETRY_ATTEMPTS = 2; // Número de reintentos en caso de fallo.
const STALE_TIME_MS = 5 * 60 * 1000; // 5 minutos: Tiempo que los datos se consideran "frescos".
const CACHE_TIME_MS = 15 * 60 * 1000; // 15 minutos: Tiempo que los datos se mantienen en caché antes de ser eliminados.

// --- GESTIÓN DE CACHE KEYS ---

/**
 * Genera una clave de caché única y consistente para una descarga de medio.
 * @param mediaDownload - La información del medio a descargar.
 * @returns Un array que sirve como clave para TanStack Query.
 */
export const getMediaCacheKey = (mediaDownload: MediaDownload) => [
  "media-download",
  mediaDownload.modelType,
  mediaDownload.modelId,
  mediaDownload.mediaId,
  mediaDownload.collection,
];

// --- HOOKS DE TANSTACK QUERY (Declarativos) ---

/**
 * Hook para la descarga de un único archivo. Ideal para usar en componentes de Vue.
 * @param mediaDownload - La información del medio a descargar.
 * @param enabled - Ref booleana para habilitar/deshabilitar la query.
 */
export const useMediaDownload = (
  mediaDownload: Ref<MediaDownload>,
  enabled: Ref<boolean> = ref(true)
) => {
  return useQuery({
    queryKey: computed(() => getMediaCacheKey(mediaDownload.value)),
    queryFn: () => fetchFileContent(mediaDownload.value),
    enabled,
    staleTime: STALE_TIME_MS,
    // cacheTime: CACHE_TIME_MS,
    retry: RETRY_ATTEMPTS,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook para la descarga de múltiples archivos en paralelo.
 * TanStack Query gestiona la concurrencia automáticamente hasta el límite del navegador.
 * @param mediasDownload - La información de los medios a descargar.
 */
export const useMultipleMediaDownloads = (
  mediasDownload: Ref<MediasDownload>
) => {
  const queries = computed(() =>
    mediasDownload.value.medias.map((media) => {
      const downloadParams: MediaDownload = {
        modelId: mediasDownload.value.modelId,
        modelType: mediasDownload.value.modelType,
        mediaId: media.attributes.uuid,
        collection: mediasDownload.value.collection,
      };
      return {
        queryKey: getMediaCacheKey(downloadParams),
        queryFn: () => fetchFileContent(downloadParams),
        staleTime: STALE_TIME_MS,
        cacheTime: CACHE_TIME_MS,
        retry: RETRY_ATTEMPTS,
        retryDelay: (attemptIndex: number) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
      };
    })
  );

  return useQueries({ queries });
};

// --- GESTOR DE DESCARGAS IMPERATIVO (Optimizado) ---

interface DownloadOptions {
  /** Límite de descargas concurrentes. Por defecto es CONCURRENT_DOWNLOAD_LIMIT. */
  concurrentLimit?: number;
  /** Callback para informar del progreso (completados, total). */
  onProgress?: (completed: number, total: number) => void;
  /** AbortSignal para cancelar la operación desde fuera. */
  signal?: AbortSignal;
}

/**
 * Función principal y optimizada para procesar una lista de descargas de medios.
 * Utiliza un pool de workers para controlar la concurrencia, se integra con el caché de
 * TanStack Query, y preserva el orden original de los archivos.
 *
 * @param queryClient - Instancia del QueryClient de TanStack para interactuar con el caché.
 * @param mediasDownload - Objeto que contiene la lista de medios a descargar.
 * @param options - Opciones de configuración para la descarga.
 * @returns Una promesa que resuelve a un array de `UploadUserFile`.
 */
export const downloadAndCacheMedias = async (
  queryClient: QueryClient,
  mediasDownload: MediasDownload,
  options: DownloadOptions = {}
): Promise<UploadUserFile[]> => {
  const {
    concurrentLimit = CONCURRENT_DOWNLOAD_LIMIT,
    onProgress,
    signal,
  } = options;

  const medias = mediasDownload.medias;
  const totalMedias = medias.length;
  // Array pre-allocado para guardar los resultados en orden.
  const results: (UploadUserFile | null)[] = new Array(totalMedias).fill(null);
  let currentIndex = 0;
  let completedCount = 0;

  // Lanza un error si la operación ya fue cancelada al inicio.
  if (signal?.aborted) {
    console.warn("Download operation cancelled before starting.");
    throw new Error("Operation cancelled");
  }

  // La función 'worker' es el corazón del sistema de concurrencia.
  // Cada worker toma un índice, procesa el medio correspondiente y luego busca el siguiente.
  const worker = async () => {
    while (currentIndex < totalMedias) {
      // Verifica la cancelación en cada iteración.
      if (signal?.aborted) {
        throw new Error("Download cancelled");
      }

      const mediaIndex = currentIndex++;
      // Si el índice está fuera de los límites, otro worker ya tomó el último elemento.
      if (mediaIndex >= totalMedias) break;

      const media = medias[mediaIndex];
      const downloadParams: MediaDownload = {
        modelId: mediasDownload.modelId,
        modelType: mediasDownload.modelType,
        mediaId: media.attributes.uuid,
        collection: mediasDownload.collection,
      };

      try {
        const cacheKey = getMediaCacheKey(downloadParams);

        // Intenta obtener los datos desde el caché para evitar una petición de red.
        let fileContent: Blob | undefined = queryClient.getQueryData(cacheKey);

        // Usa el operador ??= para asignar solo si fileContent es null o undefined.
        fileContent ??= await queryClient.fetchQuery({
          queryKey: cacheKey,
          queryFn: () => fetchFileContent(downloadParams, signal),
          staleTime: STALE_TIME_MS,
          // cacheTime: CACHE_TIME_MS,
        });

        // Almacena el resultado en la posición correcta para mantener el orden.
        if (!fileContent) {
          throw new Error("File content is undefined");
        }
        results[mediaIndex] = await createUploadUserFile(media, fileContent);
      } catch (error) {
        console.error(
          `Failed to download or process media ${media.id}:`,
          error
        );
        // En caso de error, crea un archivo de error para no romper el flujo.
        results[mediaIndex] = createErrorUploadUserFile(media, error as Error);
      } finally {
        // Informa del progreso sin importar si fue éxito o fracaso.
        completedCount++;
        onProgress?.(completedCount, totalMedias);
      }
    }
  };

  // Crea y ejecuta el pool de workers.
  const workerPromises = Array(concurrentLimit).fill(null).map(worker);
  await Promise.all(workerPromises);

  // Filtra cualquier resultado nulo (aunque no debería ocurrir) y devuelve el array final.
  return results.filter((r): r is UploadUserFile => r !== null);
};

// --- FUNCIONES AUXILIARES ---

/**
 * Realiza la petición de red para obtener el contenido de un archivo como un Blob.
 * Incluye timeout y es cancelable.
 * @param mediaDownload - Información del medio a descargar.
 * @param externalSignal - Signal opcional para cancelación externa.
 * @returns El contenido del archivo como Blob.
 */
const fetchFileContent = async (
  mediaDownload: MediaDownload,
  externalSignal?: AbortSignal
): Promise<Blob> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort("Download timeout"),
    DOWNLOAD_TIMEOUT
  );

  // Si se proporciona un signal externo, se vincula al AbortController local.
  externalSignal?.addEventListener("abort", () => {
    controller.abort(externalSignal.reason);
  });

  try {
    const response = await ApiService.vueInstance.axios.get(
      `/${mediaDownload.modelType}/download-file/${mediaDownload.modelId}/${mediaDownload.mediaId}/${mediaDownload.collection}`,
      {
        responseType: "blob",
        signal: controller.signal,
        timeout: DOWNLOAD_TIMEOUT,
      }
    );
    return response.data;
  } catch (error) {
    if (controller.signal.aborted) {
      console.error(
        "Download was cancelled or timed out:",
        controller.signal.reason
      );
    }
    throw error; // Relanza el error para que sea manejado por el llamador.
  } finally {
    clearTimeout(timeoutId); // Limpia el timeout en cualquier caso.
  }
};

/**
 * Crea un objeto `UploadUserFile` a partir de los datos del medio y su contenido.
 * @param media - Los metadatos del archivo.
 * @param fileContent - El contenido del archivo como Blob.
 * @returns El objeto `UploadUserFile` para Element Plus.
 */
const createUploadUserFile = async (
  media: any,
  fileContent: Blob
): Promise<UploadUserFile> => {
  const rawFile = new File(
    [fileContent],
    `${media.attributes.name}.${media.attributes.extension}`,
    { type: media.attributes.mimeType }
  ) as UploadRawFile;

  rawFile.uid = Number(media.id);

  // Optimización: cachea el resultado de arrayBuffer para no recalcularlo.
  let cachedBuffer: Uint8Array | null = null;
  rawFile.bytes = async () => {
    if (!cachedBuffer) {
      const buffer = await fileContent.arrayBuffer();
      cachedBuffer = new Uint8Array(buffer);
    }
    return cachedBuffer;
  };

  return {
    uid: Number(media.id),
    name: `${media.attributes.name}.${media.attributes.extension}`,
    status: "success" as const,
    size: media.attributes.size,
    url: media.attributes.publicUrl,
    raw: rawFile,
  };
};

/**
 * Crea un objeto `UploadUserFile` con estado de error.
 * @param media - Metadatos del archivo que falló.
 * @param error - El error que causó el fallo.
 * @returns Un objeto `UploadUserFile` con estado 'fail'.
 */
const createErrorUploadUserFile = (
  media: any,
  error: Error
): UploadUserFile => {
  return {
    uid: Number(media.id),
    name: `${media.attributes.name}.${media.attributes.extension} (Error: ${error.message})`,
    status: "fail" as const,
    size: 0,
    url: "",
  };
};

// --- HOOK DE UTILIDAD PARA PROGRESO (Vue 3) ---

/**
 * Hook de Vue 3 para gestionar y mostrar el estado de una descarga.
 */
export const useDownloadProgress = () => {
  const progress = ref({ completed: 0, total: 0 });

  const updateProgress = (completed: number, total: number) => {
    progress.value = { completed, total };
  };

  const resetProgress = () => {
    progress.value = { completed: 0, total: 0 };
  };

  const percentage = computed(() => {
    const { completed, total } = progress.value;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  });

  return {
    progress,
    percentage,
    updateProgress,
    resetProgress,
  };
};

// --- FUNCIÓN DE CONVENIENCIA (Mantiene compatibilidad con código existente) ---

/**
 * Función que mantiene la firma original por compatibilidad.
 * Internamente, llama a la nueva implementación optimizada.
 */
export const convertToUploadUserFile = async (
  queryClient: QueryClient,
  mediasDownload: MediasDownload,
  options: DownloadOptions = {}
): Promise<UploadUserFile[]> => {
  return downloadAndCacheMedias(queryClient, mediasDownload, options);
};

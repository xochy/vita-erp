// ==================== COMPOSABLE GENÉRICO PARA ELEMENTO INDIVIDUAL ====================

import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/modules/shared/utilities/ShowErrorNotification";
import type { BaseModel, GenericItemStore, ModelConfig } from "../interfaces/generic";
import { useAuthStore } from "@/stores/auth";
import { GenericApiService } from "../services/GenericApiService";
import { storeToRefs } from "pinia";

/**
 * Generic composable for managing a single item of a model.
 * Provides methods for fetching, creating, updating, and deleting items,
 * as well as file uploads if configured.
 */
export function useGenericItem<T extends BaseModel>(
  endpoint: string,
  store: GenericItemStore<T>,
  config: ModelConfig = {}
) {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const apiService = new GenericApiService<T>(endpoint);
  const { item } = storeToRefs(store);

  // Generate model name for permissions (keep plural, replace hyphens with spaces)
  const modelName = endpoint.replace(/-/g, ' ');

  // Generate singular model name for messages (remove 's', replace hyphens with spaces, capitalize each word)
  const singularModelName = endpoint.endsWith('s') ? endpoint.slice(0, -1) : endpoint;
  const modelNameCapitalized = singularModelName
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Mensajes por defecto con opción de personalización
  const messages = {
    created:
      config.messages?.created ??
      `${modelNameCapitalized} created successfully`,
    updated:
      config.messages?.updated ??
      `${modelNameCapitalized} updated successfully`,
    deleted:
      config.messages?.deleted ??
      `${modelNameCapitalized} deleted successfully`,
    filesSaved:
      config.messages?.filesSaved ??
      `${modelNameCapitalized} files saved successfully`,
  };

  /**
   * Mutation para obtener elemento
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: (id: number) => apiService.getById(id),
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      store.setItem(data);
    },
  });

  /**
   * Mutation para crear elemento
   */
  const { isPending: isCreating, mutateAsync: create } = useMutation({
    mutationFn: (item: T) => apiService.create(item),
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification(messages.created);
      store.setItem(data);
    },
  });

  /**
   * Mutation para actualizar elemento
   */
  const { isPending: isUpdating, mutateAsync: update } = useMutation({
    mutationFn: (item: T) => apiService.update(item),
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification(messages.updated);
      store.setItem(data);
    },
  });

  /**
   * Mutation para eliminar elemento
   */
  const { isPending: isDeleting, mutateAsync: destroy } = useMutation({
    mutationFn: (id: number) => apiService.delete(id),
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: () => {
      showSuccessNotification(messages.deleted);
      queryClient.invalidateQueries({
        queryKey: [endpoint],
      });
    },
  });

  /**
   * Mutation para subir archivos (solo si está habilitado)
   */
  const fileUploadMutation = config.hasFileUpload
    ? useMutation({
        mutationFn: ({ itemId, files }: { itemId: number; files: any[] }) =>
          apiService.uploadFiles(
            itemId,
            files,
            config.fileUploadCollection ?? "images"
          ),
        onError: (error) => {
          showErrorNotification(extractErrorDetail(error));
        },
        onSuccess: () => {
          showSuccessNotification(messages.filesSaved);
        },
      })
    : null;

  const isLoading = computed(() => {
    const baseLoading =
      isUpdating.value ||
      isFetching.value ||
      isCreating.value ||
      isDeleting.value;
    return config.hasFileUpload
      ? baseLoading || fileUploadMutation?.isPending.value
      : baseLoading;
  });

  const result: any = {
    // Métodos principales
    fetch,
    create,
    update,
    destroy,

    // Estados
    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    // Datos
    item,
    clearItem: store.clearItem,
    setItem: store.setItem,

    // Permisos
    can: {
      save:
        authStore.hasPermissionTo(`create ${modelName}`) ||
        authStore.hasPermissionTo(`update ${modelName}`),

      modify:
        authStore.hasPermissionTo(`update ${modelName}`) ||
        authStore.hasPermissionTo(`delete ${modelName}`),

      destroy: authStore.hasPermissionTo(`delete ${modelName}`),
    },
  };

  // Agregar funcionalidad de archivos solo si está habilitada
  if (config.hasFileUpload && fileUploadMutation) {
    result.uploadFiles = fileUploadMutation.mutateAsync;
    result.status.isUploadingFiles = fileUploadMutation.isPending;
  }

  return result;
}

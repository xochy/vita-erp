// src/composables/useModelLoader.ts
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useQueryClient } from "@tanstack/vue-query";
import type { UploadUserFile } from "element-plus";
import type { Media } from "@/modules/media/files/interfaces";
import type { MediasDownload } from "@/modules/shared/interfaces/medias/MediasDownload";
import { convertToUploadUserFile } from "@/helpers/MediasUtils";
import type {
  BaseModel,
  BaseResponse,
} from "@/modules/shared/generic/interfaces/generic";
import useMedia from "@/modules/shared/media/composables/UseMediaStore";

interface UseModelLoaderOptions {
  /** The model type, e.g., 'muscles', 'equipments' */
  modelType: string;
  /** The function to fetch the specific model from its store */
  fetchModel: (
    id: string | string[],
    options?: { onSuccess?: (data: BaseResponse<any>) => void }
  ) => void;
  /** The function to clear the specific model from its store (optional) */
  clearModel?: () => void;
  /** The default active tab name */
  defaultTab?: string;
  /** Specifies if the model has associated media files */
  hasMedias?: boolean;
  /** The collection name for media files, e.g., 'muscles-images' */
  mediaCollection?: string;
}

export function useModelLoader<T extends BaseModel>(
  options: UseModelLoaderOptions
) {
  const {
    modelType,
    fetchModel,
    clearModel,
    defaultTab = `${modelType}Data`,
    hasMedias = true,
    mediaCollection,
  } = options;

  const activeName = ref(defaultTab);
  const files = ref<UploadUserFile[]>([]);
  const images = ref<Media[]>([]);
  const convertingFiles = ref(false);

  const route = useRoute();
  const queryClient = useQueryClient();

  const { fetchMedias, isFetching: isFetchingMedias } = useMedia();

  // Computed property to determine if initial data loading is in progress
  const isLoadingMediasOrConverting = computed(
    () => isFetchingMedias.value === true || convertingFiles.value === true
  );

  const loadModel = (): void => {
    const modelId = route.params.id;
    const activeTab = route.params.tab || defaultTab;

    if (modelId) {
      fetchModel(modelId, {
        onSuccess: ({ data }) => {
          if (
            hasMedias &&
            data.relationships?.medias?.links?.related &&
            mediaCollection
          ) {
            fetchMedias(`${data.relationships.medias.links.related}`, {
              onSuccess: async ({ data: mediaData }) => {
                images.value = mediaData;

                convertingFiles.value = true;
                const mediasDownload: MediasDownload = {
                  modelId: Array.isArray(modelId) ? modelId[0] : modelId,
                  modelType: modelType,
                  medias: mediaData,
                  collection: mediaCollection,
                };
                files.value = await convertToUploadUserFile(
                  queryClient,
                  mediasDownload
                );
                convertingFiles.value = false;
              },
            });
          }
        },
      });
      activeName.value = Array.isArray(activeTab) ? activeTab[0] : activeTab;
    }
  };

  onMounted(() => {
    loadModel();
  });

  onUnmounted(() => {
    if (clearModel) {
      clearModel();
    }
  });

  const handleSaved = (medias: Media[]) => {
    images.value = medias;
    activeName.value = "details"; // Assume the 'details' tab is the one to show after saving
  };

  return {
    activeName,
    files,
    images,
    isLoadingMediasOrConverting,
    handleSaved,
    loadModel, // Expose for potential reloads if needed
  };
}

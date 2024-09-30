import ApiService from "@/core/services/ApiService";
import type { MediasListResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useMediasStore } from "../store/Medias";
import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of medias from the API.
 * @returns {Promise<MediasListResponse>} The list of medias.
 * @throws {Error} An error occurred while fetching medias.
 */
const getMedias = async (
  parentId: number
): Promise<MediasListResponse> => {
  try {
    const { data } =
      await ApiService.vueInstance.axios.get<MediasListResponse>(
        `/directories/${parentId}/medias`
      );

    return data;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: "An error occurred while fetching medias.",
      type: "error",
    });
    throw error;
  }
}

/**
 * @description Composable function to manage the medias.
 * @returns {Object} The medias composable.
 */
const useMedias = (): any => {
  const store = useMediasStore();
  const authStore = useAuthStore();
  const { medias, parentId } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["medias", parentId],
    queryFn: () => getMedias(parentId.value),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (mediasListResponse) => {
    if (mediasListResponse) {
      const { data: medias } = mediasListResponse;
      store.setMedias(medias);
    }
  });

  return {
    status: {
      isError,
      isLoading,
    },

    Permissions: {
      canCreateMedias: authStore.hasPermissionTo("create medias"),
    },

    medias,
    getMedias: store.setParentId,
  };
}

export default useMedias;
import ApiService from "@/core/services/ApiService";
import type { DirectoriesListResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useDirectoriesStore } from "../store/Directories";
import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of directories from the API.
 * @returns {Promise<DirectoriesListResponse>} The list of directories.
 * @throws {Error} An error occurred while fetching directories.
 */
const getDirectories = async (
  parentId: number
): Promise<DirectoriesListResponse> => {
  try {
    const { data } =
      await ApiService.vueInstance.axios.get<DirectoriesListResponse>(
        `/directories/${parentId}/subdirectories`
      );

    return data;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: "An error occurred while fetching directories.",
      type: "error",
    });
    throw error;
  }
};

/**
 * @description Composable function to manage the directories.
 * @returns {Object} The directories composable.
 */
const useDirectories = (): any => {
  const store = useDirectoriesStore();
  const authStore = useAuthStore();
  const { directories, parentId } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["subdirectories", parentId],
    queryFn: () => getDirectories(parentId.value),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (directoriesListResponse) => {
    if (directoriesListResponse) {
      const { data: directories } = directoriesListResponse;
      store.setDirectories(directories);
    }
  });

  return {
    status: {
      isError,
      isLoading,
    },

    Permissions: {
      canCreateDirectories: authStore.hasPermissionTo("create directories"),
    },

    directories,
    getDirectories: store.setParentId,
    addDirectory: store.addDirectory,
    updateDirectory: store.updateDirectory,
  };
};

export default useDirectories;

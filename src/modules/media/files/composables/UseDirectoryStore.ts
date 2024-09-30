import ApiService from "@/core/services/ApiService";
import type { Directory, DirectoryResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useDirectoryStore } from "../store/Directory";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

const store = useDirectoryStore();

/**
 * @description Fetches a directory from the API.
 * @param {number} id - The ID of the directory to fetch.
 * @returns {Promise<DirectoryResponse>} The directory.
 */
const getDirectory = async (id: number): Promise<DirectoryResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<DirectoryResponse>(
    `directories/${id}`
  );

  return data;
};

/**
 * @description Creates a new directory.
 * @param {Directory} directory - The directory to create.
 * @returns {Promise<DirectoryResponse>} The created directory.
 */
const createDirectory = async (
  directory: Directory
): Promise<DirectoryResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<DirectoryResponse>(
    "/directories",
    {
      data: {
        type: "directories",
        attributes: directory.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a directory.
 * @param {Directory} directory - The directory to update.
 * @returns {Promise<DirectoryResponse>} The updated directory.
 */
const updateDirectory = async (
  directory: Directory
): Promise<DirectoryResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<DirectoryResponse>(
    `/directories/${directory.id}`,
    {
      data: {
        type: "directories",
        id: directory.id,
        attributes: directory.attributes,
      },
    }
  );

  return data;
};

const addMediaToDirectory = async (
  directory: Directory
): Promise<DirectoryResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<DirectoryResponse>(
    `/directories/${directory.id}`,
    {
      data: {
        type: "directories",
        id: directory.id,
        meta: directory.meta,
      },
    },
    {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        store.setUploadPercentage(percentCompleted);
      },
    }
  );

  return data;
};

/**
 * @description Deletes a directory.
 * @param {number} id - The ID of the directory to delete.
 */
const deleteDirectory = async (id: number): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/directories/${id}`);
};

/**
 * @description Composable function to manage the directory.
 * @returns {Object} The directory store.
 */
const useDirectory = (): any => {
  const { id, directory, uploadPercentage } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["directory", id],
    queryFn: () => getDirectory(id.value),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (directoryResponse) => {
    if (directoryResponse) {
      const { data: directory } = directoryResponse;
      store.setDirectory(directory);
    }
  });

  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getDirectory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: (data) => {
      store.setDirectory(data.data);
    },
  });

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createDirectory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: (data) => {
      ElNotification({
        title: "Success",
        message: "Directory created successfully",
        type: "success",
      });
      store.setDirectory(data.data);
    },
  });

  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateDirectory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: (data) => {
      ElNotification({
        title: "Success",
        message: "Directory updated successfully",
        type: "success",
      });
      store.setDirectory(data.data);
    },
  });

  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deleteDirectory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        title: "Success",
        message: "Directory deleted successfully",
        type: "success",
      });
      store.clearDirectory();
    },
  });

  const { isPending: isAddingMedia, mutate: addMedia } = useMutation({
    mutationFn: addMediaToDirectory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        title: "Success",
        message: "Media added successfully",
        type: "success",
      });
    },
  });

  return {
    fetchDirectory: fetch,
    createDirectory: create,
    updateDirectory: update,
    addMediaToDirectory: addMedia,

    directory,
    clearCategory: store.clearDirectory,
    isLoading: isCreating || isUpdating,
    isFetching,

    getDirectory: store.setId,
    uploadPercentage,
  };
};

export default useDirectory;

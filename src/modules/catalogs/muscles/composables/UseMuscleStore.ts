import ApiService from "@/core/services/ApiService";
import type { Muscle, MuscleResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useMuscleStore } from "../store/Muscle";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

/**
 * @description Fetches a muscle from the API.
 * @param {number} id - The ID of the muscle to fetch.
 * @returns {Promise<MuscleResponse>} The muscle.
 */
const getMuscle = async (id: number): Promise<MuscleResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<MuscleResponse>(
    `muscles/${id}`
  );

  return data;
};

/**
 * @description Creates a new muscle.
 * @param {Muscle} muscle - The muscle to create.
 * @returns {Promise<MuscleResponse>} The created muscle.
 */
const createMuscle = async (muscle: Muscle): Promise<MuscleResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<MuscleResponse>(
    "/muscles",
    {
      data: {
        type: "muscles",
        attributes: muscle.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a muscle.
 * @param {Muscle} muscle - The muscle to update.
 * @returns {Promise<MuscleResponse>} The updated muscle.
 */
const updateMuscle = async (muscle: Muscle): Promise<MuscleResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<MuscleResponse>(
    `/muscles/${muscle.id}`,
    {
      data: {
        type: "muscles",
        id: muscle.id,
        attributes: muscle.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Deletes a muscle.
 * @param {number} id - The ID of the muscle to delete.
 * @returns {Promise<void>} The result of the deletion.
 */
const deleteMuscle = async (id: number): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/muscles/${id}`);
};

/**
 * @description Saves the muscle files.
 * @returns {Promise<any>} The result of the file saving.
 */
const saveMuscleFiles = async ({ muscleId, files }): Promise<any> => {
  const formData = new FormData();
  formData.append("id", muscleId);
  formData.append("path", "muscles");
  formData.append("collection", "images");

  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file.raw);
  });

  const { data } = await ApiService.vueInstance.axios.post(
    `/muscles/upload-files`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

/**
 * @description Composable function to manage the muscles.
 * @returns {Object} The muscles composable.
 */
const useMuscle = (): any => {
  const store = useMuscleStore();
  const { muscle } = storeToRefs(store);
  const router = useRouter();
  const queryClient = useQueryClient();

  /**
   * @description Mutation for muscle fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getMuscle,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: ({ data }) => {
      store.setMuscle(data);
    },
  });

  /**
   * @description Mutation for muscle creation.
   */
  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createMuscle,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: ({ data }) => {
      store.setMuscle(data);
      router.push({ name: "muscles-saving", params: { id: data.id } });
    },
  });

  /**
   * @description Mutation for muscle updating.
   */
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateMuscle,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: ({ data }) => {
      ElNotification({
        title: "Success",
        message: "Muscle updated successfully",
        type: "success",
      });
      store.setMuscle(data);
    },
  });

  /**
   * @description Mutation for muscle deletion.
   */
  const { isPending: isDeleting, mutate: destroy } = useMutation({
    mutationFn: deleteMuscle,
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
        message: "Muscle deleted successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["muscles?page[number]="],
      });
    },
  });

  /**
   * @description Mutation for muscle files saving.
   */
  const { isPending: isSavingFiles, mutate: saveFiles } = useMutation({
    mutationFn: saveMuscleFiles,
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
        message: "Files saved successfully",
        type: "success",
      });
    },
  });

  const isLoading = computed(
    () =>
      isUpdating.value ||
      isFetching.value ||
      isCreating.value ||
      isDeleting.value ||
      isSavingFiles.value
  );

  return {
    getMuscle: fetch,
    createMuscle: create,
    updateMuscle: update,
    deleteMuscle: destroy,
    saveMuscleFiles: saveFiles,

    status: {
      isUpdating,
      isFetching,
      isCreating,
      isDeleting,
      isSavingFiles,
    },

    isLoading,

    muscle,
    clearMuscle: store.clearMuscle,
  };
};

export default useMuscle;

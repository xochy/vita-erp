import ApiService from "@/core/services/ApiService";
import type { Workout, WorkoutResponse } from "../interfaces";
import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useWorkoutStore } from "../store/Workout";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/modules/shared/utilities/ShowErrorNotification";

/**
 * @description Fetches a workout from the API.
 * @param {number} id - The ID of the workout to fetch.
 * @returns {Promise<WorkoutResponse>} The workout.
 */
const getWorkout = async (id: number): Promise<WorkoutResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<WorkoutResponse>(
    `workouts/${id}`
  );

  return data;
};

/**
 * @description Creates a new workout.
 * @param {Workout} workout - The workout to create.
 * @returns {Promise<WorkoutResponse>} The created workout.
 */
const createWorkout = async (workout: Workout): Promise<WorkoutResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<WorkoutResponse>(
    "/workouts",
    {
      data: {
        type: "workouts",
        attributes: workout.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a workout.
 * @param {Workout} workout - The workout to update.
 * @returns {Promise<WorkoutResponse>} The updated workout.
 */
const updateWorkout = async (workout: Workout): Promise<WorkoutResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<WorkoutResponse>(
    `/workouts/${workout.id}`,
    {
      data: {
        type: "workouts",
        attributes: workout.attributes,
      },
    }
  );

  return data;
}

/**
 * @description Deletes a workout.
 * @param {number} id - The ID of the workout to delete.
 * @returns {Promise<void>} A promise that resolves when the workout is deleted.
 */
const deleteWorkout = async (id: number): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/workouts/${id}`);
}

/**
 * @description Composable function to manage the workouts.
 * @returns {Object} The workouts composable.
 */
const useWorkout = () => {
  const store = useWorkoutStore();
  const authStore = useAuthStore();
  const { workout } = storeToRefs(store);
  const queryClient = useQueryClient();

  /**
   * @description Mutation for workout fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
      mutationFn: getWorkout,
      onError: (error) => {
        showErrorNotification(extractErrorDetail(error));
      },
      onSuccess: ({ data }) => {
        store.setWorkout(data);
      },
    });

  /**
   * @description Mutation for workout creation.
   */
  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createWorkout,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Workout created successfully.");
      store.setWorkout(data);
    }
  });

  /**
   * @description Mutation for workout updating.
   */
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateWorkout,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Workout updated successfully.");
      store.setWorkout(data);
    }
  });

  /**
   * @description Mutation for workout deletion.
   */
  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deleteWorkout,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: () => {
      showSuccessNotification("Workout deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["workouts?page[number]="],
      });
    }
  });

  const isLoading = computed(
    () =>
      isUpdating.value ||
      isFetching.value ||
      isCreating.value ||
      isDeleting.value
  );

  return {
    getWorkout: fetch,
    createWorkout: create,
    updateWorkout: update,
    deleteWorkout: remove,

    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    workout,
    clearWorkout: store.clearWorkout,

    can: {
      save:
        authStore.hasPermissionTo("create workouts") ||
        authStore.hasPermissionTo("update workouts"),

      modify:
        authStore.hasPermissionTo("update workouts") ||
        authStore.hasPermissionTo("delete workouts"),

      destroy:
        authStore.hasPermissionTo("delete workouts"),
    }
  }
}

export default useWorkout;
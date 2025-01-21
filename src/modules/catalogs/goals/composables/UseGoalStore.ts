import ApiService from "@/core/services/ApiService";
import type { Goal, GoalResponse } from "../interfaces";
import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useGoalStore } from "../store/Goal";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/modules/shared/utilities/ShowErrorNotification";

/**
 * @description Fetches a goal from the API.
 * @param {number} id - The ID of the goal to fetch.
 * @returns {Promise<GoalResponse>} The goal.
 */
const getGoal = async (id: number): Promise<GoalResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<GoalResponse>(
    `goals/${id}`
  );

  return data;
};

/**
 * @description Creates a new goal.
 * @param {Goal} goal - The goal to create.
 * @returns {Promise<GoalResponse>} The created goal.
 */
const createGoal = async (goal: Goal): Promise<GoalResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<GoalResponse>(
    "/goals",
    {
      data: {
        type: "goals",
        attributes: goal.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a goal.
 * @param {Goal} goal - The goal to update.
 * @returns {Promise<GoalResponse>} The updated goal.
 */
const updateGoal = async (goal: Goal): Promise<GoalResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<GoalResponse>(
    `/goals/${goal.id}`,
    {
      data: {
        type: "goals",
        id: goal.id,
        attributes: goal.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Deletes a goal.
 * @param {Goal} goal - The goal to delete.
 * @returns {Promise<void>} The result of the deletion.
 */
const deleteGoal = async (goal: Goal): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/goals/${goal.id}`);
};

/**
 * @description Composable function to manage the goal.
 * @returns {object} The goal and the loading state.
 */
const useGoal = (): any => {
  const store = useGoalStore();
  const authStore = useAuthStore();
  const { goal } = storeToRefs(store);
  const queryClient = useQueryClient();

  /**
   * @description Mutation for goal fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getGoal,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      store.setGoal(data);
    },
  });

  /**
   * @description Mutation for goal creation.
   */
  const { isPending: isCreating, mutateAsync: create } = useMutation({
    mutationFn: createGoal,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Goal created successfully.");
      store.setGoal(data);
    },
  });

  /**
   * @description Mutation for goal updating.
   */
  const { isPending: isUpdating, mutateAsync: update } = useMutation({
    mutationFn: updateGoal,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Goal updated successfully.");
      store.setGoal(data);
    },
  });

  /**
   * @description Mutation for goal deletion.
   */
  const { isPending: isDeleting, mutateAsync: destroy } = useMutation({
    mutationFn: deleteGoal,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: () => {
      showSuccessNotification("Goal deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["goals?page[number]="],
      });
    },
  });

  const isLoading = computed(
    () =>
      isUpdating.value ||
      isFetching.value ||
      isCreating.value ||
      isDeleting.value
  );

  return {
    getGoal: fetch,
    createGoal: create,
    updateGoal: update,
    deleteGoal: destroy,

    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    goal,
    clearGoal: store.clearGoal,

    can: {
      save:
        authStore.hasPermissionTo("create goals") ||
        authStore.hasPermissionTo("update goals"),

      modify:
        authStore.hasPermissionTo("update goals") ||
        authStore.hasPermissionTo("delete goals"),

      destroy: authStore.hasPermissionTo("delete goals"),
    },
  };
};

export default useGoal;

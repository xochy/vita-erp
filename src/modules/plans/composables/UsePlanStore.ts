import ApiService from "@/core/services/ApiService";
import type { Plan, PlanResponse } from "../interfaces";
import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePlanStore } from "../store/Plan";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/modules/shared/utilities/ShowErrorNotification";

/**
 * @description Fetches a plan from the API.
 * @param {number} id - The ID of the plan to fetch.
 * @returns {Promise<PlanResponse>} The plan.
 */
const getPlan = async (id: number): Promise<PlanResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<PlanResponse>(
    `plans/${id}`
  );

  return data;
};

/**
 * @description Creates a new plan.
 * @param {Plan} plan - The plan to create.
 * @returns {Promise<PlanResponse>} The created plan.
 */
const createPlan = async (plan: Plan): Promise<PlanResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<PlanResponse>(
    "/plans",
    {
      data: {
        type: "plans",
        attributes: plan.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a plan.
 * @param {Plan} plan - The plan to update.
 * @returns {Promise<PlanResponse>} The updated plan.
 */
const updatePlan = async (plan: Plan): Promise<PlanResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<PlanResponse>(
    `/plans/${plan.id}`,
    {
      data: {
        type: "plans",
        attributes: plan.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Deletes a plan.
 * @param {number} id - The ID of the plan to delete.
 * @returns {Promise<void>} An empty promise.
 */
const deletePlan = async (id: number): Promise<void> => {
  await ApiService.vueInstance.axios.delete<void>(`/plans/${id}`);
};

/**
 * @description Composable function to manage the plan.
 * @returns {object} The plan and the loading state.
 */
const usePlan = (): any => {
  const store = usePlanStore();
  const authStore = useAuthStore();
  const { plan } = storeToRefs(store);
  const queryClient = useQueryClient();

  /**
   * @description Mutation for plan fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getPlan,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      store.setPlan(data);
    },
  });

  /**
   * @description Mutation for plan creation.
   */
  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createPlan,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Plan created successfully.");
      store.setPlan(data);
    },
  });

  /**
   * @description Mutation for plan updating.
   */
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updatePlan,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Plan updated successfully.");
      store.setPlan(data);
    },
  });

  /**
   * @description Mutation for plan deletion.
   */
  const { isPending: isDeleting, mutate: destroy } = useMutation({
    mutationFn: deletePlan,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: () => {
      showSuccessNotification("Plan deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["plans?page[number]="],
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
    getPlan: fetch,
    createPlan: create,
    updatePlan: update,
    deletePlan: destroy,

    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    plan,
    clearPlan: store.clearPlan,

    can: {
      save:
        authStore.hasPermissionTo("create plans") ||
        authStore.hasPermissionTo("update plans"),

      modify:
        authStore.hasPermissionTo("update plans") ||
        authStore.hasPermissionTo("delete plans"),

      destroy: authStore.hasPermissionTo("delete plans"),
    },
  };
};

export default usePlan;

import ApiService from "@/core/services/ApiService";
import type {
  PhysicalCondition,
  PhysicalConditionResponse,
} from "../interfaces";
import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePhysicalConditionStore } from "../store/PhysicalCondition";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/modules/shared/utilities/ShowErrorNotification";

/**
 * @description Fetches a physical condition from the API.
 * @param {number} id - The ID of the physical condition to fetch.
 * @returns {Promise<PhysicalConditionResponse>} The physical condition.
 */
const getPhysicalCondition = async (
  id: number
): Promise<PhysicalConditionResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.get<PhysicalConditionResponse>(
      `physical-conditions/${id}`
    );

  return data;
};

/**
 * @description Creates a new physical condition.
 * @param {PhysicalCondition} physicalCondition - The physical condition to create.
 * @returns {Promise<PhysicalConditionResponse>} The created physical condition.
 */
const createPhysicalCondition = async (
  physicalCondition: PhysicalCondition
): Promise<PhysicalConditionResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.post<PhysicalConditionResponse>(
      "/physical-conditions",
      {
        data: {
          type: "physical-conditions",
          attributes: physicalCondition.attributes,
        },
      }
    );

  return data;
};

/**
 * @description Updates a physical condition.
 * @param {PhysicalCondition} physicalCondition - The physical condition to update.
 * @returns {Promise<PhysicalConditionResponse>} The updated physical condition.
 */
const updatePhysicalCondition = async (
  physicalCondition: PhysicalCondition
): Promise<PhysicalConditionResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.patch<PhysicalConditionResponse>(
      `/physical-conditions/${physicalCondition.id}`,
      {
        data: {
          type: "physical-conditions",
          id: physicalCondition.id,
          attributes: physicalCondition.attributes,
        },
      }
    );

  return data;
};

/**
 * @description Deletes a physical condition.
 * @param {PhysicalCondition} physicalCondition - The physical condition to delete.
 */
const deletePhysicalCondition = async (
  physicalCondition: PhysicalCondition
): Promise<void> => {
  await ApiService.vueInstance.axios.delete(
    `/physical-conditions/${physicalCondition.id}`
  );
};

/**
 * @description Composable function to manage the physical conditions.
 * @returns {Object} The physical conditions composable.
 */
const useFrequencies = (): any => {
  const store = usePhysicalConditionStore();
  const authStore = useAuthStore();
  const { physicalCondition } = storeToRefs(store);
  const queryClient = useQueryClient();

  /**
   * @description Mutation for physical condition fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getPhysicalCondition,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      store.setPhysicalCondition(data);
    },
  });

  /**
   * @description Mutation for physical condition creation.
   */
  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createPhysicalCondition,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Physical condition created successfully.");
      store.setPhysicalCondition(data);
    },
  });

  /**
   * @description Mutation for physical condition update.
   */
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updatePhysicalCondition,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Physical condition updated successfully.");
      store.setPhysicalCondition(data);
    },
  });

  /**
   * @description Mutation for physical condition deletion.
   */
  const { isPending: isDeleting, mutate: destroy } = useMutation({
    mutationFn: deletePhysicalCondition,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: () => {
      showSuccessNotification("Physical condition deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["physical-conditions?page[number]="],
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
    getPhysicalCondition: fetch,
    createPhysicalCondition: create,
    updatePhysicalCondition: update,
    deletePhysicalCondition: destroy,

    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    physicalCondition,
    clearPhysicalCondition: store.clearPhysicalCondition,

    can: {
      save:
        authStore.hasPermissionTo("create physical conditions") ||
        authStore.hasPermissionTo("update physical conditions"),

      modify:
        authStore.hasPermissionTo("update physical conditions") ||
        authStore.hasPermissionTo("delete physical conditions"),

      destroy: authStore.hasPermissionTo("delete physical conditions"),
    },
  };
};

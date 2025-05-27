import ApiService from "@/core/services/ApiService";
import type { Frequency, FrequencyResponse } from "../interfaces";
import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useFrequencyStore } from "../store/Frequency";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/modules/shared/utilities/ShowErrorNotification";

/**
 * @description Fetches a frequency from the API.
 * @param {number} id - The ID of the frequency to fetch.
 * @returns {Promise<FrequencyResponse>} The frequency.
 */
const getFrequency = async (id: number): Promise<FrequencyResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<FrequencyResponse>(
    `frequencies/${id}`
  );

  return data;
};

/**
 * @description Creates a new frequency.
 * @param {Frequency} frequency - The frequency to create.
 * @returns {Promise<FrequencyResponse>} The created frequency.
 */
const createFrequency = async (
  frequency: Frequency
): Promise<FrequencyResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<FrequencyResponse>(
    "/frequencies",
    {
      data: {
        type: "frequencies",
        attributes: frequency.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a frequency.
 * @param {Frequency} frequency - The frequency to update.
 * @returns {Promise<FrequencyResponse>} The updated frequency.
 */
const updateFrequency = async (
  frequency: Frequency
): Promise<FrequencyResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<FrequencyResponse>(
    `/frequencies/${frequency.id}`,
    {
      data: {
        type: "frequencies",
        id: frequency.id,
        attributes: frequency.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Deletes a frequency.
 * @param {Frequency} frequency - The frequency to delete.
 * @returns {Promise<void>} The result of the deletion.
 */
const deleteFrequency = async (frequency: Frequency): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/frequencies/${frequency.id}`);
};

/**
 * @description Composable function to manage the frequencies.
 * @returns {Object} The frequencies composable.
 */
const useFrequency = (): any => {
  const store = useFrequencyStore();
  const authStore = useAuthStore();
  const { frequency } = storeToRefs(store);
  const queryClient = useQueryClient();

  /**
   * @description Mutation for frequency fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getFrequency,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      store.setFrequency(data);
    },
  });

  /**
   * @description Mutation for frequency creation.
   */
  const { isPending: isCreating, mutateAsync: create } = useMutation({
    mutationFn: createFrequency,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Frequency created successfully.");
      store.setFrequency(data);
    },
  });

  /**
   * @description Mutation for frequency update.
   */
  const { isPending: isUpdating, mutateAsync: update } = useMutation({
    mutationFn: updateFrequency,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Frequency updated successfully.");
      store.setFrequency(data);
    },
  });

  /**
   * @description Mutation for frequency deletion.
   */
  const { isPending: isDeleting, mutateAsync: destroy } = useMutation({
    mutationFn: deleteFrequency,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: () => {
      showSuccessNotification("Frequency deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["frequencies?page[number]="],
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
    getFrequency: fetch,
    createFrequency: create,
    updateFrequency: update,
    deleteFrequency: destroy,

    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    frequency,
    clearFrequency: store.clearFrequency,

    can: {
      save:
        authStore.hasPermissionTo("create frequencies") ||
        authStore.hasPermissionTo("update frequencies"),

      modify:
        authStore.hasPermissionTo("update frequencies") ||
        authStore.hasPermissionTo("delete frequencies"),

      destroy: authStore.hasPermissionTo("delete frequencies"),
    },
  };
};

export default useFrequency;

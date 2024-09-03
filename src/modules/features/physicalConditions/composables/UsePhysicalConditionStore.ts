import { ref, watch } from "vue";
import type {
  PhysicalCondition,
  PhysicalConditionResponse,
} from "../interfaces";
import ApiService from "@/core/services/ApiService";
import { useQuery } from "@tanstack/vue-query";

/**
 * Fetches a physical condition from the API.
 *
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
 * Composable function to manage the physical condition.
 *
 * @param {number} id - The ID of the physical condition to fetch.
 * @returns {Object} The physical condition composable.
 */
const usePhysicalCondition = (id: number) => {
  const physicalCondition = ref<PhysicalCondition>();

  const { data, isLoading } = useQuery({
    queryKey: ["physical-condition", id],
    queryFn: () => getPhysicalCondition(id),
    retry: 3,
    retryDelay: 1000,
  });

  watch(
    data,
    (physicalConditionResponse) => {
      if (physicalConditionResponse) {
        const { data: physicalConditionData } = {
          ...physicalConditionResponse,
        };
        physicalCondition.value = physicalConditionData;
      }
    },
    { immediate: true }
  );

  return {
    // Properties
    physicalCondition,
    isLoading,
  };
};

export default usePhysicalCondition;

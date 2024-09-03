import ApiService from "@/core/services/ApiService";
import type { PhysicalConditionsListResponse } from "../interfaces";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePhysicalConditionsStore } from "../store/PhysicalConditions";
import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * Fetches a list of physical conditions from the API.
 *
 * @param {number} pageSize - The number of physical conditions to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @returns {Promise<PhysicalConditionsListResponse>} The list of physical conditions.
 */
const getPhysicalConditions = async (
  pageSize: number,
  pageNumber: number
): Promise<PhysicalConditionsListResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.get<PhysicalConditionsListResponse>(
      `physical-conditions?page[size]=${pageSize}&page[number]=${pageNumber}`
    );

  return data;
};

/**
 * Composable function to manage the physical conditions.
 *
 * @returns {Object} The physical conditions composable.
 */
const usePhysicalConditions = () => {
  const store = usePhysicalConditionsStore();
  const authStore = useAuthStore();
  const {
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    physicalConditions,
  } = storeToRefs(store);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["physical-conditions?page[number]=", currentPage],
    queryFn: () => getPhysicalConditions(perPage.value, currentPage.value),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (physicalConditionsListResponse) => {
    if (physicalConditionsListResponse) {
      const { meta, data: physicalConditions } = physicalConditionsListResponse;
      const { page } = meta;
      const { currentPage, from, lastPage, perPage, to, total } = page;

      store.setCurrentPage(currentPage);
      store.setFrom(from);
      store.setLastPage(lastPage);
      store.setPerPage(perPage);
      store.setTo(to);
      store.setTotal(total);
      store.setPhysicalConditions(physicalConditions);
    }
  });

  return {
    // Properties
    error,
    isError,
    isLoading,

    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    physicalConditions,

    // Methods
    getPage: store.setCurrentPage,

    // Permissions
    canCreatePhysicalConditions: authStore.hasPermissionTo(
      "create physical conditions"
    ),
  };
};

export default usePhysicalConditions;

import ApiService from "@/core/services/ApiService";
import type { PhysicalConditionsListResponse } from "../interfaces";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePhysicalConditionsStore } from "../store/PhysicalConditions";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of physical conditions from the API. First, it generates
 * the query parameters and then fetches the physical conditions from the API.
 * @param {number} pageSize - The number of physical conditions to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @param {string} sortBy - The field to sort by.
 * @param {string} searchBy - The search query.
 * @returns {Promise<PhysicalConditionsListResponse>} The list of physical conditions.
 * @throws {Error} An error occurred while fetching physical conditions.
 */
const getPhysicalConditions = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<PhysicalConditionsListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      "fields[physical-conditions]": fields,
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } =
      await ApiService.vueInstance.axios.get<PhysicalConditionsListResponse>(
        "physical-conditions",
        { params }
      );

    return data;
  } catch (error) {
    showErrorNotification(
      "An error occurred while fetching physical conditions."
    );
    throw error;
  }
};

/**
 * @description Composable function to manage the physical conditions.
 * @param {string} fields - The fields to fetch for the physical conditions.
 * @returns {Object} The physical conditions composable.
 */
const usePhysicalConditions = (fields: string): any => {
  const store = usePhysicalConditionsStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, physicalConditions } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "physical-conditions?page[number]=",
      { currentPage, perPage, sortBy, searchBy },
    ],
    queryFn: () =>
      getPhysicalConditions(
        perPage.value,
        currentPage.value,
        sortBy.value,
        searchBy.value,
        fields
      ),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (physicalConditionsListResponse) => {
    if (physicalConditionsListResponse) {
      const { meta, data: physicalConditions } = physicalConditionsListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setPhysicalConditions(physicalConditions);
    }
  });

  const refetchPhysicalConditions = async () =>
    queryClient.invalidateQueries({
      queryKey: ["physical-conditions?page[number]="],
    });

  return {
    status: {
      isError,
      isLoading,
    },

    pag: {
      total,
      perPage,
      currentPage,

      getSortBy: store.setSortBy,
      getPerPage: store.setPerPage,
      getSearchBy: store.setSearchBy,
      getPage: store.setCurrentPage,
    },

    permissions: {
      canCreatePhysicalConditions: authStore.hasPermissionTo(
        "create physical conditions"
      ),
    },

    physicalConditions,
    refetchPhysicalConditions,
  };
};

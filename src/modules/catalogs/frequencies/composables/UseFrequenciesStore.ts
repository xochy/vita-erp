import ApiService from "@/core/services/ApiService";
import type { FrequenciesListResponse } from "../interfaces";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useFrequenciesStore } from "../store/Frequencies";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of frequencies from the API. First, it generates
 * the query parameters and then fetches the frequencies from the API.
 * @param {number} pageSize - The number of frequencies to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @param {string} sortBy - The field to sort by.
 * @param {string} searchBy - The search query.
 * @returns {Promise<FrequenciesListResponse>} The list of frequencies.
 * @throws {Error} An error occurred while fetching frequencies.
 */
const getFrequencies = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<FrequenciesListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      "fields[frequencies]": fields,
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } =
      await ApiService.vueInstance.axios.get<FrequenciesListResponse>(
        "frequencies",
        { params }
      );

    return data;
  } catch (error) {
    showErrorNotification("An error occurred while fetching frequencies.");
    throw error;
  }
};

/**
 * @description Composable function to manage the frequencies.
 * @param {string} fields - The fields to fetch for the frequencies.
 * @returns {Object} The frequencies composable.
 */
const useFrequencies = (fields: string): any => {
  const store = useFrequenciesStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, frequencies } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "frequencies?page[number]=",
      { currentPage, perPage, sortBy, searchBy },
    ],
    queryFn: () =>
      getFrequencies(
        perPage.value,
        currentPage.value,
        sortBy.value,
        searchBy.value,
        fields
      ),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (frequenciesListResponse) => {
    if (frequenciesListResponse) {
      const { meta, data: frequencies } = frequenciesListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setFrequencies(frequencies);
    }
  });

  const refetchFrequencies = async () =>
    queryClient.invalidateQueries({
      queryKey: ["frequencies?page[number]="],
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
      canCreateFrequencies: authStore.hasPermissionTo("create frequencies"),
    },

    frequencies,
    refetchFrequencies,
  };
};

export default useFrequencies;

import ApiService from "@/core/services/ApiService";
import type { GoalsListResponse } from "../interfaces";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useGoalsStore } from "../store/Goals";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of goals from the API. First, it generates
 * the query parameters and then fetches the goals from the API.
 * @param {number} pageSize - The number of goals to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @param {string} sortBy - The field to sort by.
 * @param {string} searchBy - The search query.
 * @returns {Promise<GoalsListResponse>} The list of goals.
 * @throws {Error} An error occurred while fetching goals.
 */
const getGoals = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<GoalsListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      "fields[goals]": fields,
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } = await ApiService.vueInstance.axios.get<GoalsListResponse>(
      "goals",
      { params }
    );

    return data;
  } catch (error) {
    showErrorNotification("An error occurred while fetching goals.");
    throw error;
  }
};

/**
 * @description Composable function to manage the goals.
 * @param {string} fields - The fields to fetch for the goals.
 * @returns {Object} The goals composable.
 */
const useGoals = (fields: string): any => {
  const store = useGoalsStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, goals } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "goals?page[number]=",
      { perPage, currentPage, sortBy, searchBy },
    ],
    queryFn: () =>
      getGoals(
        perPage.value,
        currentPage.value,
        sortBy.value,
        searchBy.value,
        fields
      ),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (goalsListResponse) => {
    if (goalsListResponse) {
      const { meta, data: goals } = goalsListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setGoals(goals);
    }
  });

  const refetchGoals = async () =>
    queryClient.invalidateQueries({
      queryKey: ["goals?page[number]="],
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
      canCreateGoals: authStore.hasPermissionTo("create goals"),
    },

    goals,
    refetchGoals,
  };
};

export default useGoals;

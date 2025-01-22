import ApiService from "@/core/services/ApiService";
import type { PlansListResponse } from "../interfaces";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePlansStore } from "../store/Plans";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of plans from the API. First, it generates
 * the query parameters and then fetches the plans from the API.
 * @param {number} pageSize - The number of plans to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @param {string} sortBy - The field to sort by.
 * @param {string} searchBy - The search query.
 * @returns {Promise<PlansListResponse>} The list of plans.
 * @throws {Error} An error occurred while fetching plans.
 */
const getPlans = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<PlansListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      "fields[plans]": fields,
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } = await ApiService.vueInstance.axios.get<PlansListResponse>(
      "plans",
      { params }
    );

    return data;
  } catch (error) {
    showErrorNotification("An error occurred while fetching plans.");
    throw error;
  }
};

/**
 * @description Composable function to manage the plans.
 * @param {string} fields - The fields to fetch for the plans.
 * @returns {Object} The plans composable.
 */
const usePlans = (fields: string): any => {
  const store = usePlansStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, plans } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "plans?page[number]=",
      { currentPage, perPage, sortBy, searchBy },
    ],
    queryFn: () =>
      getPlans(
        perPage.value,
        currentPage.value,
        sortBy.value,
        searchBy.value,
        fields
      ),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (plansListResponse) => {
    if (plansListResponse) {
      const { meta, data: categories } = plansListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setPlans(categories);
    }
  });

  const refetchPlans = async () =>
    queryClient.invalidateQueries({
      queryKey: ["plans?page[number]="],
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
      canCreateCategories: authStore.hasPermissionTo("create plans"),
    },

    plans,
    refetchPlans,
  };
};

export default usePlans;

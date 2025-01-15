import ApiService from "@/core/services/ApiService";
import type { CategoriesListResponse } from "../interfaces";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useCategoriesStore } from "../store/Categories";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of categories from the API. First, it generates
 * the query parameters and then fetches the categories from the API.
 * @param {number} pageSize - The number of categories to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @param {string} sortBy - The field to sort by.
 * @param {string} searchBy - The search query.
 * @returns {Promise<CategoriesListResponse>} The list of categories.
 * @throws {Error} An error occurred while fetching categories.
 */
const getCategories = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<CategoriesListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      "fields[categories]": fields,
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } =
      await ApiService.vueInstance.axios.get<CategoriesListResponse>(
        "categories",
        { params }
      );

    return data;
  } catch (error) {
    showErrorNotification("An error occurred while fetching categories.");
    throw error;
  }
};

/**
 * @description Composable function to manage the categories.
 * @param {string} fields - The fields to fetch for the categories.
 * @returns {Object} The categories composable.
 */
const useCategories = (fields: string): any => {
  const store = useCategoriesStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, categories } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "categories?page[number]=",
      { currentPage, perPage, sortBy, searchBy },
    ],
    queryFn: () =>
      getCategories(
        perPage.value,
        currentPage.value,
        sortBy.value,
        searchBy.value,
        fields
      ),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (categoriesListResponse) => {
    if (categoriesListResponse) {
      const { meta, data: categories } = categoriesListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setCategories(categories);
    }
  });

  const refetchCategories = async () =>
    queryClient.invalidateQueries({
      queryKey: ["categories?page[number]="],
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
      canCreateCategories: authStore.hasPermissionTo("create categories"),
    },

    categories,
    refetchCategories,
  };
};

export default useCategories;

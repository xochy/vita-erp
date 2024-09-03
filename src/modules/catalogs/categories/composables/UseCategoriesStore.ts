import ApiService from "@/core/services/ApiService";
import type { CategoriesListResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useCategoriesStore } from "../store/Categories";
import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of categories from the API.
 * @param {number} pageSize - The number of categories to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @returns {Promise<CategoriesListResponse>} The list of categories.
 * @throws {Error} An error occurred while fetching categories.
 */
const getCategories = async (
  pageSize: number,
  pageNumber: number,
  fields: string
): Promise<CategoriesListResponse> => {
  try {
    const { data } =
      await ApiService.vueInstance.axios.get<CategoriesListResponse>(
        "categories",
        {
          params: {
            "page[size]": pageSize,
            "page[number]": pageNumber,
            "fields[categories]": fields,
          },
        }
      );

    return data;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: "An error occurred while fetching categories.",
      type: "error",
    });
    throw error;
  }
};

/**
 * @description Composable function to manage the categories.
 * @returns {Object} The categories composable.
 */
const useCategories = (fields: string) => {
  const store = useCategoriesStore();
  const authStore = useAuthStore();
  const { currentPage, perPage, total, categories } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories?page[number]=", currentPage],
    queryFn: () => getCategories(perPage.value, currentPage.value, fields),
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

  return {
    status: {
      isError,
      isLoading,
    },

    pagination: {
      total,
      perPage,
      currentPage,
    },

    Permissions: {
      canCreateCategories: authStore.hasPermissionTo("create categories"),
    },

    categories,
    getPage: store.setCurrentPage,
  };
};

export default useCategories;

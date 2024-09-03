import { ref, watch } from "vue";
import type { Category, CategoryResponse } from "../interfaces";
import ApiService from "@/core/services/ApiService";
import { useQuery } from "@tanstack/vue-query";

/**
 * Fetches a category from the API.
 *
 * @param {number} id - The ID of the category to fetch.
 * @returns {Promise<CategoryResponse>} The category.
 */
const getCategory = async (id: number): Promise<CategoryResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.get<CategoryResponse>(`categories/${id}`);

  return data;
};

/**
 * Composable function to manage the category.
 *
 * @param {number} id - The ID of the category to fetch.
 * @returns {Object} The category composable.
 */
const useCategory = (id: number) => {
  const category = ref<Category>();

  const { data, isLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    retry: 3,
    retryDelay: 1000,
  });

  watch(
    data,
    (categoryResponse) => {
      if (categoryResponse) {
        const { data: categoryData } = { ...categoryResponse };
        category.value = categoryData;
      }
    },
    { immediate: true }
  );

  return {
    // Properties
    category,
    isLoading,
  };
};

export default useCategory;
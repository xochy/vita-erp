import ApiService from "@/core/services/ApiService";
import type { Category, CategoryResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "../store/Category";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

/**
 * @descriptio Fetches a category from the API.
 * @param {number} id - The ID of the category to fetch.
 * @returns {Promise<CategoryResponse>} The category.
 */
const getCategory = async (id: number): Promise<CategoryResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<CategoryResponse>(
    `categories/${id}`
  );

  return data;
};

/**
 * @description Creates a new category.
 * @param {Category} category - The category to create.
 * @returns {Promise<CategoryResponse>} The created category.
 */
const createCategory = async (
  category: Category
): Promise<CategoryResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<CategoryResponse>(
    "/categories",
    {
      data: {
        type: "categories",
        attributes: category.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a category.
 * @param {Category} category - The category to update.
 * @returns {Promise<CategoryResponse>} The updated category.
 */
const updateCategory = async (
  category: Category
): Promise<CategoryResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<CategoryResponse>(
    `/categories/${category.id}`,
    {
      data: {
        type: "categories",
        id: category.id,
        attributes: category.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Composable function to manage the category.
 * @returns {object} The category and the loading state.
 */
const useCategory = (): any => {
  const store = useCategoryStore();
  const { category } = storeToRefs(store);
  const router = useRouter();

  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getCategory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: (data) => {
      store.setCategory(data.data);
    },
  });

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: (data) => {
      ElNotification({
        title: "Success",
        message: "Category created successfully",
        type: "success",
      });
      store.setCategory(data.data);
    },
  });

  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: (data) => {
      ElNotification({
        title: "Success",
        message: "Category updated successfully",
        type: "success",
      });
      store.setCategory(data.data);
    },
  });

  return {
    getCategory: fetch,
    createCategory: create,
    updateCategory: update,

    category,
    clearCategory: store.clearCategory,
    isLoading: isCreating || isUpdating || isFetching,
  };
};

export default useCategory;

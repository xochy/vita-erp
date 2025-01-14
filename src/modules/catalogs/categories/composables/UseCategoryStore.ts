import ApiService from "@/core/services/ApiService";
import type { Category, CategoryResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "../store/Category";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

/**
 * @description Fetches a category from the API.
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
 * @description Deletes a category.
 * @param {number} categoryId - The ID of the category to delete.
 * @returns {Promise<void>} The result of the deletion.
 */
const deleteCategory = async (categoryId: number): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/categories/${categoryId}`);
};

/**
 * @description Composable function to manage the category.
 * @returns {object} The category and the loading state.
 */
const useCategory = (): any => {
  const store = useCategoryStore();
  const authStore = useAuthStore();
  const { category } = storeToRefs(store);
  const queryClient = useQueryClient();

  /**
   * @description Mutation for category fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getCategory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: ({ data }) => {
      store.setCategory(data);
    },
  });

  /**
   * @description Mutation for category creation.
   */
  const { isPending: isCreating, mutateAsync: create } = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: ({ data }) => {
      ElNotification({
        title: "Success",
        message: "Category created successfully",
        type: "success",
      });
      store.setCategory(data);
    },
  });

  /**
   * @description Mutation for category updating.
   */
  const { isPending: isUpdating, mutateAsync: update } = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: ({ data }) => {
      ElNotification({
        title: "Success",
        message: "Category updated successfully",
        type: "success",
      });
      store.setCategory(data);
    },
  });

  /**
   * @description Mutation for category deletion.
   */
  const { isPending: isDeleting, mutateAsync: destroy } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        title: "Success",
        message: "Category deleted successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["categories?page[number]="],
      });
    },
  });

  const isLoading = computed(
    () =>
      isUpdating.value ||
      isFetching.value ||
      isCreating.value ||
      isDeleting.value
  );

  return {
    getCategory: fetch,
    createCategory: create,
    updateCategory: update,
    deleteCategory: destroy,

    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    category,
    clearCategory: store.clearCategory,

    can: {
      save:
        authStore.hasPermissionTo("create categories") ||
        authStore.hasPermissionTo("update categories"),

      modify:
        authStore.hasPermissionTo("update categories") ||
        authStore.hasPermissionTo("delete categories"),

      destroy: authStore.hasPermissionTo("delete categories"),
    },
  };
};

export default useCategory;

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from "../interfaces";

/**
 * @description Defines the categories store.
 */
export const useCategoriesStore = defineStore("categories", () => {
  const total = ref<number>(1);
  const perPage = ref<number>(5);
  const currentPage = ref<number>(1);

  const categories = ref<Category[]>([]);

  return {
    total,
    perPage,
    categories,
    currentPage,

    setTotal(value: number) {
      total.value = value;
    },

    setPerPage(value: number) {
      perPage.value = value;
    },

    setCurrentPage(page: number) {
      currentPage.value = page;
    },

    setCategories(value: Category[]) {
      categories.value = value;
    },
  };
});

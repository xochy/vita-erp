import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from "../interfaces";

/**
 * @description Defines the categories store.
 */
export const useCategoriesStore = defineStore("categories", () => {
  const total = ref<number>(1);
  const sortBy = ref<string>("");
  const perPage = ref<number>(5);
  const searchBy = ref<string>("");
  const currentPage = ref<number>(1);

  const categories = ref<Category[]>([]);

  return {
    total,
    sortBy,
    perPage,
    searchBy,
    categories,
    currentPage,

    setTotal(value: number) {
      total.value = value;
    },

    setSortBy(value: string) {
      sortBy.value = value;
    },

    setPerPage(value: number) {
      perPage.value = value;
    },

    setSearchBy(value: string) {
      searchBy.value = value;
    },

    setCurrentPage(page: number) {
      currentPage.value = page;
    },

    setCategories(value: Category[]) {
      categories.value = value;
    },
  };
});

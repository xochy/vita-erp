import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from "../interfaces";

/**
 * @description Defines the categories store.
 * @returns {Object} The categories store.
 */
export const useCategoriesStore = defineStore("categories", () => {
  const total = ref<number>(1);
  const sortBy = ref<string>("");
  const perPage = ref<number>(10);
  const searchBy = ref<string>("");
  const currentPage = ref<number>(1);

  const categories = ref<Category[]>([]);

  return {
    categories,

    setCategories(value: Category[]) {
      categories.value = value;
    },

    // #region::Pagination
    total,
    sortBy,
    perPage,
    searchBy,
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
    // #endregion::Pagination
  };
});

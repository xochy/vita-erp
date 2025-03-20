import { defineStore } from "pinia";
import { ref } from "vue";
import type { Goal } from "../interfaces";

/**
 * @description Define the goals store.
 * @returns {Object} The goals store.
 */
export const useGoalsStore = defineStore("goals", () => {
  const total = ref<number>(1);
  const sortBy = ref<string>("");
  const perPage = ref<number>(10);
  const searchBy = ref<string>("");
  const currentPage = ref<number>(1);

  const goals = ref<Goal[]>([]);

  return {
    goals,

    setGoals(value: Goal[]) {
      goals.value = value;
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

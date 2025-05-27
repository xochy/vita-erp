import { defineStore } from "pinia";
import { ref } from "vue";
import type { Plan } from "../interfaces";

/**
 * @description Define the goals store.
 * @returns {Object} The goals store.
 */
export const usePlansStore = defineStore("plans", () => {
  const total = ref<number>(1);
  const sortBy = ref<string>("");
  const perPage = ref<number>(10);
  const searchBy = ref<string>("");
  const currentPage = ref<number>(1);

  const plans = ref<Plan[]>([]);

  return {
    plans,

    setPlans(value: Plan[]) {
      plans.value = value;
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

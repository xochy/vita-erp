import { defineStore } from "pinia";
import { ref } from "vue";
import type { Muscle } from "../interfaces";

/**
 * @description Defines the muscles store.
 * @returns {Object} The muscles store.
 */
export const useMusclesStore = defineStore("muscles", () => {
  const total = ref<number>(1);
  const sortBy = ref<string>("");
  const perPage = ref<number>(5);
  const searchBy = ref<string>("");
  const currentPage = ref<number>(1);

  const muscles = ref<Muscle[]>([]);

  return {
    muscles,

    setMuscles(value: Muscle[]) {
      muscles.value = value;
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
      console.log(value);

      searchBy.value = value;
    },

    setCurrentPage(page: number) {
      currentPage.value = page;
    },
    // #endregion::Pagination
  };
});

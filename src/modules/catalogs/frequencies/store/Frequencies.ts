import { defineStore } from "pinia";
import { ref } from "vue";
import type { Frequency } from "../interfaces";

/**
 * @description Define the frequencies store.
 * @returns {Object} The frequencies store.
 */
export const useFrequenciesStore = defineStore("frequencies", () => {
  const total = ref<number>(1);
  const sortBy = ref<string>("");
  const perPage = ref<number>(10);
  const searchBy = ref<string>("");
  const currentPage = ref<number>(1);

  const frequencies = ref<Frequency[]>([]);

  return {
    frequencies,

    setFrequencies(value: Frequency[]) {
      frequencies.value = value;
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

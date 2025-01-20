import { defineStore } from "pinia";
import { ref } from "vue";
import type { PhysicalCondition } from "../interfaces";

/**
 * @description Define the physical conditions store.
 * @returns {Object} The physical conditions store.
 */
export const usePhysicalConditionsStore = defineStore(
  "physicalConditions",
  () => {
    const total = ref<number>(1);
    const sortBy = ref<string>("");
    const perPage = ref<number>(5);
    const searchBy = ref<string>("");
    const currentPage = ref<number>(1);

    const physicalConditions = ref<PhysicalCondition[]>([]);

    return {
      physicalConditions,

      setPhysicalConditions(value: PhysicalCondition[]) {
        physicalConditions.value = value;
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
  }
);

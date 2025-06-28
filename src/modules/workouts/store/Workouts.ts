import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Workout } from '../interfaces';

/**
 * @description Defines the workouts store.
 * @returns {Object} The workouts store.
 */
export const useWorkoutsStore = defineStore('workouts', () => {
  const total = ref<number>(1);
  const sortBy = ref<string>('');
  const perPage = ref<number>(9);
  const searchBy = ref<string>('');
  const currentPage = ref<number>(1);

  const workouts = ref<Workout[]>([]);

  return {
    workouts,

    setWorkouts(value: Workout[]) {
      workouts.value = value;
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
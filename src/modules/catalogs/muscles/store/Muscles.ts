import { defineStore } from "pinia";
import { ref } from "vue";
import type { Muscle } from "../interfaces";

/**
 * @description Defines the muscle store.
 */
export const useMusclesStore = defineStore("muscles", () => {
  const total = ref<number>(1);
  const perPage = ref<number>(5);
  const currentPage = ref<number>(1);

  const muscles = ref<Muscle[]>([]);

  return {
    total,
    perPage,
    muscles,
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

    setMuscles(value: Muscle[]) {
      muscles.value = value;
    },
  };
});

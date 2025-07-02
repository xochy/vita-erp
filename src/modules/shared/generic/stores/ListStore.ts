import { defineStore } from "pinia";
import { ref } from "vue";
import type { BaseModel } from "../interfaces/generic";

/**
 * Factory para crear stores de listas genéricos
 */
export function createListStore<T extends BaseModel>(storeName: string) {
  return defineStore(storeName, () => {
    const total = ref<number>(1);
    const sortBy = ref<string>("");
    const perPage = ref<number>(10);
    const searchBy = ref<string>("");
    const currentPage = ref<number>(1);
    const items = ref<T[]>([]);

    return {
      items,
      setItems(value: T[]) {
        items.value = value;
      },

      // Pagination
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
    };
  });
}
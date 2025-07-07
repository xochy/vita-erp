import { defineStore } from "pinia";
import { ref } from "vue";
import type { BaseModel } from "../interfaces/generic";

/**
 * Factory para crear stores de listas genéricos
 */
export function createFlatListStore<T extends BaseModel>(storeName: string) {
  return defineStore(storeName, () => {
    const items = ref<T[]>([]);

    return {
      items,
      setItems(value: T[]) {
        items.value = value;
      },
    };
  });
}

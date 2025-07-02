// ==================== STORE GENÉRICO PARA ELEMENTO INDIVIDUAL ====================

import type { BaseModel } from "../interfaces/generic";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Factory para crear stores de elementos individuales genéricos
 */
export function createItemStore<T extends BaseModel>(
  storeName: string,
  initializer: () => T
) {
  return defineStore(storeName, () => {
    const item = ref<T>(initializer());

    const setItem = (selectedItem: T): void => {
      console.log("Setting item:", selectedItem);
      item.value = JSON.parse(JSON.stringify(selectedItem));
    };

    const clearItem = (): void => {
      item.value = initializer();
    };

    return {
      item,
      setItem,
      clearItem,
    };
  });
}
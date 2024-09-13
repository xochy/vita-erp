import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from "../interfaces";

const initializeCategory = (): Category => ({
  id: "",
  type: "categories",
  attributes: {
    name: "",
    description: "",
  },
});

export const useCategoryStore = defineStore("category", () => {
  const category = ref<Category>(initializeCategory());

  const setCategory = (selectedCategory: Category): void => {
    category.value = JSON.parse(JSON.stringify(selectedCategory));;
  }

  const clearCategory = (): void => {
    category.value = initializeCategory();
  }

  return {
    category,
    setCategory,
    clearCategory,
  };
});
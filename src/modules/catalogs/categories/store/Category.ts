import type { Category } from "../interfaces/category";
import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";

/**
 * @description Initialize a category object
 * @returns {Category} An empty category object
 */
const initializeCategory = (): Category => ({
  id: "",
  type: "categories",
  attributes: {
    name: "",
    description: "",
  },
});

/**
 * @description Store for managing the category state
 * @returns {Object} The category store
 */
export const useCategoryStore = createItemStore<Category>(
  "category",
  initializeCategory
);

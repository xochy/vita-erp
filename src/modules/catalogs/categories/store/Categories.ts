import type { Category } from "../interfaces/category";
import { createListStore } from "@/modules/shared/generic/stores/ListStore";

/**
 * @description Defines the categories store.
 * @returns {Object} The categories store.
 */
export const useCategoriesStore = createListStore<Category>("categories");

import type { Category } from "../interfaces/category";
import { createFlatListStore } from "@/modules/shared/generic/stores/FlatListStore";

/**
 * @description Defines the flat categories store.
 * @returns {Object} The flat categories store.
 */
export const useFlatCategoriesStore = createFlatListStore<Category>("flat-categories");
import type { Category } from "../interfaces/category";
import { useFlatCategoriesStore } from "../store/FlatCategories";
import { useGenericFlatList } from "@/modules/shared/generic/composables/useGenericFlatList";

export const useFlatCategories = (fields: string) => {
  const store = useFlatCategoriesStore();
  return useGenericFlatList<Category>("categories", store, fields);
};
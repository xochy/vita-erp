import type { Category } from "../interfaces/category";
import { useCategoriesStore } from "../store/Categories";
import { useGenericList } from "@/modules/shared/generic/composables/useGenericList";

export const useCategories = (fields: string) => {
  const store = useCategoriesStore();
  return useGenericList<Category>("categories", store, fields);
};
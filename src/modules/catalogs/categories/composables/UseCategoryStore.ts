import type { Category } from "../interfaces/category";
import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import { useCategoryStore } from "../store/Category";
import { useGenericItem } from "@/modules/shared/generic/composables/useGenericItem";

export const translationableFields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const useCategory = () => {
  const store = useCategoryStore();
  return useGenericItem<Category>("categories", store);
};
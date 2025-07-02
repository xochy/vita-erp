import type { Goal } from "../interfaces/goal";
import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import { useGenericItem } from "@/modules/shared/generic/composables/useGenericItem";
import { useGoalStore } from "../store/Goal";

export const translationableFields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const useGoal = () => {
  const store = useGoalStore();
  return useGenericItem<Goal>("goals", store);
};
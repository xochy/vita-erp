import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import type { PhysicalCondition } from "../interfaces/physicalCondition";
import { usePhysicalConditionStore } from "../store/PhysicalCondition";
import { useGenericItem } from "@/modules/shared/generic/composables/useGenericItem";

export const translationableFields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const usePhysicalCondition = () => {
  const store = usePhysicalConditionStore();
  return useGenericItem<PhysicalCondition>("physical-conditions", store);
};
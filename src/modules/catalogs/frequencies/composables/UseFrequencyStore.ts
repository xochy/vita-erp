import type { Frequency } from "../interfaces/frequency";
import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import { useFrequencyStore } from "../store/Frequency";
import { useGenericItem } from "@/modules/shared/generic/composables/useGenericItem";

export const translationableFields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const useFrequency = () => {
  const store = useFrequencyStore();
  return useGenericItem<Frequency>("frequencies", store);
};

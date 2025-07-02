import type { Frequency } from "../interfaces/frequency";
import { useFrequenciesStore } from "../store/Frequencies";
import { useGenericList } from "@/modules/shared/generic/composables/useGenericList";

export const useFrequencies = (fields: string) => {
  const store = useFrequenciesStore();
  return useGenericList<Frequency>("frequencies", store, fields);
};
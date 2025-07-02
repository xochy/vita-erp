import type { Muscle } from "../interfaces/muscle";
import { useMusclesStore } from "../store/Muscles";
import { useGenericList } from "@/modules/shared/generic/composables/useGenericList";

export const useMuscles = (fields: string) => {
  const store = useMusclesStore();
  return useGenericList<Muscle>("muscles", store, fields);
};

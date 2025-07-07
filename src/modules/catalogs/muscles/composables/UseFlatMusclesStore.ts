import type { Muscle } from "../interfaces/muscle";
import { useFlatMusclesStore } from "../store/FlatMuscles";
import { useGenericFlatList } from "@/modules/shared/generic/composables/useGenericFlatList";

export const useFlatMuscles = (fields: string) => {
  const store = useFlatMusclesStore();
  return useGenericFlatList<Muscle>("muscles", store, fields);
};

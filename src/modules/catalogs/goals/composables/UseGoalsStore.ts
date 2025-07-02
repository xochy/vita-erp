import type { Goal } from "../interfaces/goal";
import { useGoalsStore } from "../store/Goals";
import { useGenericList } from "@/modules/shared/generic/composables/useGenericList";

export const useGoals = (fields: string) => {
  const store = useGoalsStore();
  return useGenericList<Goal>("goals", store, fields);
};
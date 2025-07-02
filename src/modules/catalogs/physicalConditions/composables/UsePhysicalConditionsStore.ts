import type { PhysicalCondition } from "../interfaces/physicalCondition";
import { usePhysicalConditionsStore } from "../store/PhysicalConditions";
import { useGenericList } from "@/modules/shared/generic/composables/useGenericList";

export const usePhysicalConditions = (fields: string) => {
  const store = usePhysicalConditionsStore();
  return useGenericList<PhysicalCondition>("physical-conditions", store, fields);
};
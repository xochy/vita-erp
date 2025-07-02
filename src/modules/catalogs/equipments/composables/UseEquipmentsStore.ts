import type { Equipment } from "../interfaces/equipment";
import { useEquipmentsStore } from "../store/Equipments";
import { useGenericList } from "@/modules/shared/generic/composables/useGenericList";

export const useEquipments = (fields: string) => {
  const store = useEquipmentsStore();
  return useGenericList<Equipment>("equipments", store, fields);
};

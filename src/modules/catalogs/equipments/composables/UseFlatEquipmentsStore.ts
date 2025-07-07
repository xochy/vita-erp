import type { Equipment } from "../interfaces/equipment";
import { useFlatEquipmentsStore } from "../store/FlatEquipments";
import { useGenericFlatList } from "@/modules/shared/generic/composables/useGenericFlatList";

export const useFlatEquipments = (fields: string) => {
  const store = useFlatEquipmentsStore();
  return useGenericFlatList<Equipment>("equipments", store, fields);
};
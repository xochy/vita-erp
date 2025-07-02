import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";
import type { Equipment } from "../interfaces/equipment";

const initializeEquipment = (): Equipment => ({
  id: "",
  type: "equipments",
  attributes: {
    name: "",
    description: "",
  },
});

export const useEquipmentStore = createItemStore<Equipment>("equipment", initializeEquipment);
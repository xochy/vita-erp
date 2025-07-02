import type { Equipment } from "../interfaces/equipment";
import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";

/**
 * @description Initialize an equipment object
 * @returns {Equipment} An empty equipment object
 */
const initializeEquipment = (): Equipment => ({
  id: "",
  type: "equipments",
  attributes: {
    name: "",
    description: "",
  },
});

/**
 * @description Store for managing the equipment state
 * @returns {Object} The equipment store
 */
export const useEquipmentStore = createItemStore<Equipment>(
  "equipment",
  initializeEquipment
);
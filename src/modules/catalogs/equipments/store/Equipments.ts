import type { Equipment } from "../interfaces/equipment";
import { createListStore } from "@/modules/shared/generic/stores/ListStore";

/**
 * @description Defines the equipments store.
 * @returns {Object} The equipments store.
 */
export const useEquipmentsStore = createListStore<Equipment>("equipments");
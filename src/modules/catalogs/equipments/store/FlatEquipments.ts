import type { Equipment } from "../interfaces/equipment";
import { createFlatListStore } from "@/modules/shared/generic/stores/FlatListStore";

/**
 * @description Defines the flat equipment store.
 * @returns {Object} The flat equipment store.
 */
export const useFlatEquipmentsStore = createFlatListStore<Equipment>("flat-equipments");
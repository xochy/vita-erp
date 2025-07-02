import type { PhysicalCondition } from "../interfaces";
import { createListStore } from "@/modules/shared/generic/stores/ListStore";

/**
 * @description Define the physical conditions store.
 * @returns {Object} The physical conditions store.
 */
export const usePhysicalConditionsStore = createListStore<PhysicalCondition>("physicalConditions");

import type { PhysicalCondition } from "../interfaces/physicalCondition";
import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";

/**
 * @description Initialize a physical condition object
 * @returns {PhysicalCondition} An empty physical condition object
 */
const initializePhysicalCondition = (): PhysicalCondition => ({
  id: "",
  type: "physical-conditions",
  attributes: {
    name: "",
    description: "",
  },
});

/**
 * @description Store for managing the physical condition state
 * @returns {Object} The physical condition store
 */
export const usePhysicalConditionStore = createItemStore<PhysicalCondition>(
  "physicalCondition",
  initializePhysicalCondition
);

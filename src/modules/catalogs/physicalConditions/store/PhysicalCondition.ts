import { defineStore } from "pinia";
import { ref } from "vue";
import type { PhysicalCondition } from "../interfaces";

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
export const usePhysicalConditionStore = defineStore(
  "physicalCondition",
  () => {
    const physicalCondition = ref<PhysicalCondition>(
      initializePhysicalCondition()
    );

    const setPhysicalCondition = (
      selectedPhysicalCondition: PhysicalCondition
    ): void => {
      physicalCondition.value = JSON.parse(
        JSON.stringify(selectedPhysicalCondition)
      );
    };

    const clearPhysicalCondition = (): void => {
      physicalCondition.value = initializePhysicalCondition();
    };

    return {
      physicalCondition,
      setPhysicalCondition,
      clearPhysicalCondition,
    };
  }
);

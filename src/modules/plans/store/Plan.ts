import { defineStore } from "pinia";
import { ref } from "vue";
import type { Plan } from "../interfaces";

/**
 * @description Initialize a plan object
 * @returns {Plan} An empty plan object
 */
const initializePlan = (): Plan => ({
  id: "",
  type: "plans",
  attributes: {
    name: "",
  },
});

/**
 * @description Store for managing the plan state
 * @returns {Object} The plan store
 */
export const usePlanStore = defineStore("plan", () => {
  const plan = ref<Plan>(initializePlan());

  const setPlan = (selectedPlan: Plan): void => {
    plan.value = JSON.parse(JSON.stringify(selectedPlan));
  };

  const clearPlan = (): void => {
    plan.value = initializePlan();
  };

  return {
    plan,
    setPlan,
    clearPlan,
  };
});

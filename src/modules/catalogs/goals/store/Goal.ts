import { defineStore } from "pinia";
import { ref } from "vue";
import type { Goal } from "../interfaces";

/**
 * @description Initialize a goal object
 * @returns {Goal} An empty goal object
 */
const initializeGoal = (): Goal => ({
  id: "",
  type: "goals",
  attributes: {
    name: "",
    description: "",
  },
});

/**
 * @description Store for managing the goal state
 * @returns {Object} The goal store
 */
export const useGoalStore = defineStore("goal", () => {
  const goal = ref<Goal>(initializeGoal());

  const setGoal = (selectedGoal: Goal): void => {
    goal.value = JSON.parse(JSON.stringify(selectedGoal));
  };

  const clearGoal = (): void => {
    goal.value = initializeGoal();
  };

  return {
    goal,
    setGoal,
    clearGoal,
  };
});

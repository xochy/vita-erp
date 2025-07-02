import type { Goal } from "../interfaces/goal";
import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";

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
export const useGoalStore = createItemStore<Goal>(
  "goal",
  initializeGoal
);

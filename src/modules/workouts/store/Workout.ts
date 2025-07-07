import type { MultipleModelData } from "@/modules/shared/translations/interfaces";
import type { Workout } from "../interfaces/workout";
import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";

/**
 * @description Initialize a workout object
 * @returns {Workout} An empty workout object
 */
const initializeWorkout = (): Workout => ({
  id: "",
  type: "workouts",
  attributes: {
    group: "",
    levels: "[]",
    name: "",
    performance: "",
  },
  relationships: {
    // category will be a single ModelData object
    category: undefined,
    // muscles will be a MultipleModelData object with 'data' as an array
    muscles: { data: [] as MultipleModelData['data'] },
    // equipments will be a MultipleModelData object with 'data' as an array
    equipments: { data: [] as MultipleModelData['data'] },
  },
});

/**
 * @description Store for managing the workout state
 * @returns {Object} The workout store
 */
export const useWorkoutStore = createItemStore<Workout>(
  "workout",
  initializeWorkout
);

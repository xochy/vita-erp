import type { Workout } from "../interfaces/workout";
import { createListStore } from "@/modules/shared/generic/stores/ListStore";

/**
 * @description Defines the workouts store.
 * @returns {Object} The workouts store.
 */
export const useWorkoutsStore = createListStore<Workout>("workouts");
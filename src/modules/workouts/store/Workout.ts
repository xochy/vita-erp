import { defineStore } from "pinia";
import { ref } from "vue";
import type { Workout } from "../interfaces";

/**
 * @description Initialize a workout object
 * @returns {Workout} An empty workout object
 */
const initializeWorkout = (): Workout => ({
  id: "",
  type: "workouts",
  attributes: {
    group: "",
    levels: "",
    name: "",
    performance: "",
  },
});

/**
 * @description Store for managing the workout state
 * @returns {Object} The workout store
 */
export const useWorkoutStore = defineStore("workout", () => {
  const workout = ref<Workout>(initializeWorkout());

  const setWorkout = (selectedWorkout: Workout): void => {
    workout.value = JSON.parse(JSON.stringify(selectedWorkout));
  };

  const clearWorkout = (): void => {
    workout.value = initializeWorkout();
  };

  return {
    workout,
    setWorkout,
    clearWorkout,
  };
});
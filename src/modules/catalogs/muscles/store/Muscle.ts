import { defineStore } from "pinia";
import { ref } from "vue";
import type { Muscle } from "../interfaces";

/**
 * @description Initialize a muscle object
 * @returns {Muscle} An empty muscle object
 */
const initializeMuscle = (): Muscle => ({
  id: "",
  type: "muscles",
  attributes: {
    name: "",
    description: "",
  },
});

/**
 * @description Store for managing the muscle state
 * @returns {Object} The muscle store
 */
export const useMuscleStore = defineStore("muscle", () => {
  const muscle = ref<Muscle>(initializeMuscle());

  const setMuscle = (selectedMuscle: Muscle): void => {
    muscle.value = JSON.parse(JSON.stringify(selectedMuscle));;
  }

  const clearMuscle = (): void => {
    muscle.value = initializeMuscle();
  }

  return {
    muscle,
    setMuscle,
    clearMuscle,
  };
});
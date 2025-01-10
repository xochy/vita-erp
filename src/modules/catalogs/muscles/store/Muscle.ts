import { defineStore } from "pinia";
import { ref } from "vue";
import type { Muscle } from "../interfaces";

const initializeMuscle = (): Muscle => ({
  id: "",
  type: "muscles",
  attributes: {
    name: "",
    description: "",
  },
});

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
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Frequency } from "../interfaces";

/**
 * @description Initialize a frequency object
 * @returns {Frequency} An empty frequency object
 */
const initializeFrequency = (): Frequency => ({
  id: "",
  type: "frequencies",
  attributes: {
    name: "",
    description: "",
  },
});

/**
 * @description Store for managing the frequency state
 * @returns {Object} The frequency store
 */
export const useFrequencyStore = defineStore("frequency", () => {
  const frequency = ref<Frequency>(initializeFrequency());

  const setFrequency = (selectedFrequency: Frequency): void => {
    frequency.value = JSON.parse(JSON.stringify(selectedFrequency));
  };

  const clearFrequency = (): void => {
    frequency.value = initializeFrequency();
  };

  return {
    frequency,
    setFrequency,
    clearFrequency,
  };
});

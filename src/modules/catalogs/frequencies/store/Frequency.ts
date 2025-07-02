import type { Frequency } from "../interfaces";
import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";

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
export const useFrequencyStore = createItemStore<Frequency>(
  "frequency",
  initializeFrequency
);

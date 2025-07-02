import type { Muscle } from "../interfaces/muscle";
import { createItemStore } from "@/modules/shared/generic/stores/ItemStore";

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
export const useMuscleStore = createItemStore<Muscle>(
  "muscle",
  initializeMuscle
);

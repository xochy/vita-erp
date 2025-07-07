import type { Muscle } from "../interfaces/muscle";
import { createFlatListStore } from "@/modules/shared/generic/stores/FlatListStore";

/**
 * @description Defines the flat muscles store.
 * @returns {Object} The flat muscles store.
 */
export const useFlatMusclesStore = createFlatListStore<Muscle>("flat-muscles");
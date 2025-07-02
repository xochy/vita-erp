import type { Muscle } from "../interfaces";
import { createListStore } from "@/modules/shared/generic/stores/ListStore";

/**
 * @description Defines the muscles store.
 * @returns {Object} The muscles store.
 */
export const useMusclesStore = createListStore<Muscle>("muscles");

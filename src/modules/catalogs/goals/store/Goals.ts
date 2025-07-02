import type { Goal } from "../interfaces";
import { createListStore } from "@/modules/shared/generic/stores/ListStore";

/**
 * @description Define the goals store.
 * @returns {Object} The goals store.
 */
export const useGoalsStore = createListStore<Goal>("goals");

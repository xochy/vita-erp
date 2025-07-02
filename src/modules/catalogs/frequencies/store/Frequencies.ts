import type { Frequency } from "../interfaces/frequency";
import { createListStore } from "@/modules/shared/generic/stores/ListStore";

/**
 * @description Define the frequencies store.
 * @returns {Object} The frequencies store.
 */
export const useFrequenciesStore = createListStore<Frequency>("frequencies");

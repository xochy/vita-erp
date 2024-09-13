import { defineStore } from "pinia";
import { ref } from "vue";
import type { Translation } from "../interfaces";

/**
 * @description Defines the translations store.
 */
export const useTranslationsStore = defineStore("translations", () => {
  const path = ref<string>("");
  const translations = ref<Translation[]>([]);

  return {
    path,
    translations,

    setPath(value: string) {
      path.value = value;
    },

    setTranslations(value: Translation[]) {
      translations.value = value;
    },
  };
});

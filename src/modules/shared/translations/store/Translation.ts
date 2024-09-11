import { defineStore } from "pinia";
import { ref } from "vue";
import type { Translation } from "../interfaces";

const initializeTranslation = (): Translation => ({
  id: "",
  type: "translations",
  attributes: {
    column: "",
    locale: "",
    translation: "",
  },
});

export const useTranslationStore = defineStore("translation", () => {
  const translation = ref<Translation>(initializeTranslation());

  const setTranslation = (selectedTranslation: Translation): void => {
    translation.value = JSON.parse(JSON.stringify(selectedTranslation));
  };

  const clearTranslation = (): void => {
    translation.value = initializeTranslation();
  };

  return {
    translation,
    setTranslation,
    clearTranslation,
  };
});
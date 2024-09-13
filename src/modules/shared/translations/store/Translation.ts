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
  relationships: {
    translationable: {
      data: {
        id: "",
        type: "",
      },
    },
  },
});

export const useTranslationStore = defineStore("translation", () => {
  const translation = ref<Translation>(initializeTranslation());

  interface Locale {
    value: string;
    label: string;
  }
  const locales = ref<Locale[]>([
    { value: "es", label: "Spanish" },
  ]);

  const setTranslation = (selectedTranslation: Translation): void => {
    translation.value = JSON.parse(JSON.stringify(selectedTranslation));
  };

  const clearTranslation = (): void => {
    translation.value = initializeTranslation();
  };

  return {
    locales,
    translation,
    setTranslation,
    clearTranslation,
  };
});

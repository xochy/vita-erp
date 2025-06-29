<template>
  <el-collapse v-model="activeNames" accordion>
    <el-collapse-item
      v-for="translation in translations"
      :key="translation.id"
      :title="getTitle(translation.attributes.column, translation.attributes.locale)"
      :name="translation.id"
    >
      <p class="text-gray-700">
        {{ translation.attributes.translation }}
      </p>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import type { Translation } from "@/modules/shared/translations/interfaces";
import { ref } from "vue";
import { capitalizeFirst } from "@/helpers/stringUtils";

/* ------------------------------ Refs & Props ------------------------------ */

defineProps<{ translations: Translation[] }>();

const activeNames = ref<string[]>([]);

/* -------------------------------- Functions ------------------------------- */

const getTitle = (column: string, locale: string) => {
  const languageMap = {
    es: "Spanish",
    en: "English",
  };
  const languageName = languageMap[locale] || locale.toUpperCase();
  return `${capitalizeFirst(column)} in ${languageName} (${locale})`;
};
</script>

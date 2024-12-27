<template>
  <el-table v-loading="isLoading" :data="translations" style="width: 100%">
    <el-table-column prop="attributes.column" label="Column" width="180" />
    <el-table-column prop="attributes.locale" label="Locale" width="180" />
    <el-table-column prop="attributes.translation" label="Translation" width="960" />
    <template #append>
      <el-button link type="primary" size="small" @click="handleEditTranslations"
        >Edit</el-button
      >
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Translation } from "../interfaces";

/* ------------------------------ Props & Refs ------------------------------ */

interface Props {
  isLoading: boolean;
  categoryId: string;
  translations: Translation[];
}

const props = defineProps<Props>();
const route = useRouter();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Redirects the user to the translations editing page
 * @param {string} categoryId
 * @returns {void}
 */
const handleEditTranslations = (): void => {
  route.push({
    name: "categories-saving",
    params: { id: String(props.categoryId), tab: "translations" },
  });
};
</script>

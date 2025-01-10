<template>
  <el-table v-loading="isLoading" :data="translations" style="width: 100%">
    <el-table-column prop="attributes.column" label="Column" width="180" />
    <el-table-column prop="attributes.locale" label="Locale" width="180" />
    <el-table-column prop="attributes.translation" label="Translation" width="960" />
  </el-table>
</template>

<script setup lang="ts">
import type { Translation } from "../interfaces";

/* ------------------------------ Props & Refs ------------------------------ */

interface Props {
  isLoading: boolean;
  translations: Translation[];
}

defineProps<Props>();
</script>

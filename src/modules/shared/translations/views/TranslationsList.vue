<template>
  <el-empty description="An error occurred while fetching translations." v-if="isError" />
  <TranslationsTable v-else :is-loading="isLoading" :translations="data?.data ?? []" />
</template>

<script setup lang="ts">
import TranslationsTable from "../components/TranslationsTable.vue";
import useTranslations from "../composables/UseTranslationsStore";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const FIELDS_SET = "column,locale,translation";

const { data, isLoading, isError } = useTranslations(props.path, FIELDS_SET);
</script>

<template>
  <el-empty description="An error occurred while fetching translations." v-if="isError" />
  <TranslationsTable
    v-else
    :is-loading="isPending"
    :translations="data?.data ?? []"
  />
</template>

<script setup lang="ts">
import TranslationsTable from "../components/TranslationsTable.vue";
import { useTranslationsQuery } from "../composables/UseTranslationsStore";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const FIELDS_SET = "column,locale,translation";
const { data, isPending, isError } = useTranslationsQuery(props.path, FIELDS_SET);
</script>

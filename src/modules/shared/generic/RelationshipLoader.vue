<template>
  <BasicSkeleton v-if="isLoading" />

  <el-alert v-else-if="isError" title="Error" type="error" :closable="false">
    Ocurrió un error al cargar los datos.
  </el-alert>

  <slot v-else-if="data" :data="data"></slot>
</template>

<script setup lang="ts" generic="T">
import { useRelationship } from "@/modules/shared/interfaces/Services/useRelationship";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import type { MaybeRefOrGetter } from "vue";

/* ------------------------------ Refs & Props ------------------------------ */

const props = defineProps<{
  // The URL of the relationship to load.
  relatedUrl: MaybeRefOrGetter<string | undefined>;
  // The unique key for the TanStack Query.
  queryKey: string;
  // The model type for the API (e.g., "categories", "muscles").
  modelType: string;
  // The fields to retrieve from the API.
  fieldsSet: string;
}>();

// We use the generic composable to load the data.
// The type <T> is inferred from `defineProps` thanks to `generic="T"` in <script>.
const { data, isLoading, isError } = useRelationship<T>(
  props.relatedUrl,
  props.queryKey,
  props.modelType,
  props.fieldsSet
);
</script>
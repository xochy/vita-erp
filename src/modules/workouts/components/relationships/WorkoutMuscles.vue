<template>
  <BasicSkeleton v-if="areMusclesLoading" />

  <MusclesWithTranslations
    v-else
    :muscles="musclesListResponse!.data"
    v-if="!isMusclesError"
  />

  <el-alert v-if="isMusclesError" title="Error" type="error" :closable="false">
    An error occurred while fetching muscles data.
  </el-alert>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import MusclesWithTranslations from "@/components/shared/muscles/MusclesWithTranslations.vue";
import type { MusclesListResponse } from "@/modules/catalogs/muscles/interfaces";
import { useRelationship } from "@/modules/shared/interfaces/Services/useRelationship";

/* ------------------------------ Refs & Props ------------------------------ */

const FIELDS_SET = "name,description,translations";

const props = defineProps<{ relatedUrl: string }>();

const {
  data: musclesListResponse,
  isLoading: areMusclesLoading,
  isError: isMusclesError,
} = useRelationship<MusclesListResponse>(
  props.relatedUrl,
  "workout-muscles",
  "muscles",
  FIELDS_SET
);
</script>

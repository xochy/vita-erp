<template>
  <BasicSkeleton v-if="areMusclesLoading" />
  <MusclesWithTranslations
    v-else
    :muscles="musclesListResponse!.data"
    v-if="!isMusclesError"
  />
</template>

<script setup lang="ts">
import { useRelationship } from "@/modules/shared/interfaces/Services/useRelationship";
import type { MusclesListResponse } from "@/modules/catalogs/muscles/interfaces";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import MusclesWithTranslations from "@/components/shared/muscles/MusclesWithTranslations.vue";

const props = defineProps<{ relatedUrl: string }>();

const {
  data: musclesListResponse,
  isLoading: areMusclesLoading,
  isError: isMusclesError,
} = useRelationship<MusclesListResponse>(props.relatedUrl, "workout-muscles");
</script>

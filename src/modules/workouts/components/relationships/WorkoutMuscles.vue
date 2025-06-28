<template>
  <div>
    {{ musclesListResponse }}
  </div>
</template>

<script setup lang="ts">
import { useRelationship } from '@/modules/shared/interfaces/Services/useRelationship';
import type { WorkoutsListResponse } from '../../interfaces';

const props = defineProps<{ relatedUrl: string }>();

const {
  data: musclesListResponse,
  isLoading: isMusclesLoading,
  isError: isMusclesError,
} = useRelationship<WorkoutsListResponse>(props.relatedUrl, "workout-muscles");
</script>
<template>
  <slot name="options"></slot>
  <BasicSkeleton v-if="isLoading" :width="100" :height="600" />
  <el-row v-else class="workouts-table">
    <el-col
      v-for="workout in workouts"
      :key="workout.id"
      :span="24"
      :xl="24"
      class="workout-col"
    >
      <WorkoutCard :workout="workout" />
    </el-col>
  </el-row>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import BasicSkeleton from '@/components/shared/skeletons/BasicSkeleton.vue';
import WorkoutCard from './WorkoutCard.vue';
import type { Workout } from '../interfaces';

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ workouts: Workout[]; isLoading: boolean }>();
</script>

<template>
  <ModelDetails
    :model="workout"
    :isLoading="isLoading"
    :deleteFunction="destroy"
    redirectRouteName="workouts"
    :canDelete="can.destroy"
    titleKey="name"
    descriptionKey="description"
  />
</template>

<script setup lang="ts">
import ModelDetails from "@/components/shared/cards/GenericDetailsCard.vue";
import type { Workout } from "../interfaces/workout";
import { useWorkout } from "../composables/UseWorkoutStore";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{
  workout: Workout;
  isLoading: boolean;
}>();

const { can, destroy } = useWorkout();
</script>

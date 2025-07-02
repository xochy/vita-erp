<template>
  <ModelDetails
    :model="goal"
    :isLoading="isLoading"
    :deleteFunction="destroy"
    redirectRouteName="goals"
    :canDelete="can.destroy"
    titleKey="name"
    descriptionKey="description"
  />
</template>

<script setup lang="ts">
import ModelDetails from "@/components/shared/cards/GenericDetailsCard.vue";
import type { Goal } from "../interfaces/goal";
import { useGoal } from "../composables/UseGoalStore";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{
  goal: Goal;
  isLoading: boolean;
}>();

const { can, destroy } = useGoal();
</script>

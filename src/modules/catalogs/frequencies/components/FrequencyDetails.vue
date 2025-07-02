<template>
  <ModelDetails
    :model="frequency"
    :isLoading="isLoading"
    :deleteFunction="destroy"
    redirectRouteName="frequencies"
    :canDelete="can.destroy"
    titleKey="name"
    descriptionKey="description"
  />
</template>

<script setup lang="ts">
import ModelDetails from "@/components/shared/cards/GenericDetailsCard.vue";
import type { Frequency } from "../interfaces/frequency";
import { useFrequency } from "../composables/UseFrequencyStore";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{
  frequency: Frequency;
  isLoading: boolean;
}>();

const { can, destroy } = useFrequency();
</script>

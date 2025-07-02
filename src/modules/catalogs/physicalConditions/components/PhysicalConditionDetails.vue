<template>
  <ModelDetails
    :model="physicalCondition"
    :isLoading="isLoading"
    :deleteFunction="destroy"
    redirectRouteName="physical-conditions"
    :canDelete="can.destroy"
    titleKey="name"
    descriptionKey="description"
  />
</template>

<script setup lang="ts">
import ModelDetails from "@/components/shared/cards/GenericDetailsCard.vue";
import type { PhysicalCondition } from "../interfaces/physicalCondition";
import { usePhysicalCondition } from "../composables/UsePhysicalConditionStore";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{
  physicalCondition: PhysicalCondition;
  isLoading: boolean;
}>();

const { can, destroy } = usePhysicalCondition();
</script>

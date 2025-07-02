<template>
  <ModelDetails
    :model="muscle"
    :isLoading="isLoading"
    :deleteFunction="destroy"
    redirectRouteName="muscles"
    :canDelete="can.destroy"
    :images="images"
    :hasImageSection="hasImageSection"
    titleKey="name"
    descriptionKey="description"
  />
</template>

<script setup lang="ts">
import ModelDetails from "@/components/shared/cards/GenericDetailsCard.vue";
import type { Muscle } from "../interfaces/muscle";
import type { Media } from "@/modules/media/files/interfaces";
import { computed } from "vue";
import { useMuscle } from "../composables/UseMuscleStore";

const props = defineProps<{
  muscle: Muscle;
  isLoading: boolean;
  images?: Media[];
}>();

const { can, destroy } = useMuscle();
const hasImageSection = computed(() => !!props.images && props.images.length > 0);
</script>

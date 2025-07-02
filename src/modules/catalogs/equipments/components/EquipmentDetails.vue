<template>
  <ModelDetails
    :model="equipment"
    :isLoading="isLoading"
    :deleteFunction="destroy"
    redirectRouteName="equipments"
    :canDelete="can.destroy"
    :images="images"
    :hasImageSection="hasImageSection"
    titleKey="name"
    descriptionKey="description"
  />
</template>

<script setup lang="ts">
import ModelDetails from "@/components/shared/cards/GenericDetailsCard.vue";
import type { Equipment } from "../interfaces/equipment";
import type { Media } from "@/modules/media/files/interfaces";
import { computed } from "vue";
import { useEquipment } from "../composables/UseEquipmentStore";

const props = defineProps<{
  equipment: Equipment;
  isLoading: boolean;
  images?: Media[];
}>();

const { can, destroy } = useEquipment();
const hasImageSection = computed(() => !!props.images && props.images.length > 0);
</script>

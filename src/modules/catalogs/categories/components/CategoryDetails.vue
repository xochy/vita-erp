<template>
  <ModelDetails
    :model="category"
    :isLoading="isLoading"
    :deleteFunction="destroy"
    redirectRouteName="categories"
    :canDelete="can.destroy"
    :images="images"
    :hasImageSection="hasImageSection"
    titleKey="name"
    descriptionKey="description"
  />
</template>

<script setup lang="ts">
import ModelDetails from "@/components/shared/cards/GenericDetailsCard.vue";
import type { Category } from "../interfaces/category";
import type { Media } from "@/modules/media/files/interfaces";
import { computed } from "vue";
import { useCategory } from "../composables/UseCategoryStore";

const props = defineProps<{
  category: Category;
  isLoading: boolean;
  images?: Media[];
}>();

const { can, destroy } = useCategory();
const hasImageSection = computed(() => !!props.images && props.images.length > 0);
</script>

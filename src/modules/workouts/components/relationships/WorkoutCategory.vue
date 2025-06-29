<template>
  <BasicSkeleton v-if="isCategoryLoading" />
  <CategoryWithTranslations v-else :category="categoryResponse!.data" />
</template>

<script setup lang="ts">
import type { CategoryResponse } from "@/modules/catalogs/categories/interfaces";
import { useRelationship } from "@/modules/shared/interfaces/Services/useRelationship";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import CategoryWithTranslations from "@/components/shared/categories/CategoryWithTranslations.vue";

const CATEGORY_FIELDS_SET = "name,description,translations";

const props = defineProps<{ relatedUrl: string }>();

const {
  data: categoryResponse,
  isLoading: isCategoryLoading,
  isError: isCategoryError,
} = useRelationship<CategoryResponse>(
  props.relatedUrl,
  "workout-category",
  CATEGORY_FIELDS_SET
);
</script>

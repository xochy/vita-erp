<template>
  <BasicSkeleton v-if="isCategoryLoading" />

  <CategoryWithTranslations
    v-else
    :category="categoryResponse!.data"
    v-if="!isCategoryError"
  />

  <el-alert v-if="isCategoryError" title="Error" type="error" :closable="false">
    An error occurred while fetching category data.
  </el-alert>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import CategoryWithTranslations from "@/components/shared/categories/CategoryWithTranslations.vue";
import type { CategoryResponse } from "@/modules/catalogs/categories/interfaces";
import { useRelationship } from "@/modules/shared/interfaces/Services/useRelationship";

/* ------------------------------ Refs & Props ------------------------------ */

const FIELDS_SET = "name,description,translations";

const props = defineProps<{ relatedUrl: string }>();

const {
  data: categoryResponse,
  isLoading: isCategoryLoading,
  isError: isCategoryError,
} = useRelationship<CategoryResponse>(
  props.relatedUrl,
  "workout-category",
  "categories",
  FIELDS_SET
);
</script>

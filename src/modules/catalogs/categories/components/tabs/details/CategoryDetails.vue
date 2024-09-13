<template>
  <BasicSkeleton v-if="isLoading" />

  <el-descriptions v-else border>
    <el-descriptions-item label="Name">
      {{ category.attributes.name }}
    </el-descriptions-item>
    <el-descriptions-item label="Description">
      {{ category.attributes.description }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import type { Category } from "@/modules/catalogs/categories/interfaces";

defineProps<{ category: Category; isLoading: boolean }>();
</script>

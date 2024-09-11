<template>
  <el-descriptions border>
    <el-descriptions-item label="Name">
      {{ category.attributes.name }}
    </el-descriptions-item>
    <el-descriptions-item label="Description">
      {{ category.attributes.description }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import useCategory from "@/modules/catalogs/categories/composables/UseCategoryStore";

const { category } = useCategory();
</script>

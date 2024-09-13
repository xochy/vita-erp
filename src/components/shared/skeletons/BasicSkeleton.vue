<template>
  <el-skeleton animated :style="{ width: `${width}%` }">
    <template #template>
      <el-skeleton-item variant="rect" :style="{ height: `${height}px` }" />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 120,
  },
});
</script>

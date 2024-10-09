<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in history" :key="item.id">
      <el-button
        link
        size="small"
        :disabled="isLast(index)"
        @click="emit('change-directory', item)"
      >
        {{ item.attributes.name }}
      </el-button>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import type { Directory } from '../../interfaces';

/* ------------------------------ Refs & Props ------------------------------ */

const props = defineProps<{
  history: Directory[];
}>();

/* -------------------------------- Functions ------------------------------- */

const isLast = (index: number) => {
  return index === props.history.length - 1;
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits({
  "change-directory": (directory: Directory) => directory,
});
</script>
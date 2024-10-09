<template>
  <div class="mt-4 text-sm font-bold">
    <el-descriptions size="small" border>
      <el-descriptions-item label="Folders">
        {{ directoriesCount }}
      </el-descriptions-item>
      <el-descriptions-item label="Files">{{ mediasCount }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mediasCount: number;
  directoriesCount: number;
}>();
</script>

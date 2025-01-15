<template>
  <el-result icon="el-icon-s-help" title="No data" :sub-title="message" />
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>

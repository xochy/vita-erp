<template>
  <div class="flex items-center">
    <el-button @click="$emit('create-folder')">
      <el-icon class="el-icon--left"><FolderAdd /></el-icon>New folder
    </el-button>
    <el-button type="primary" @click="$emit('upload-click')">
      <el-icon class="el-icon--left"><Upload /></el-icon>Upload files
    </el-button>
    <el-button type="primary" :icon="Share" />
  </div>
</template>

<script setup lang="ts">
import { Share } from "@element-plus/icons-vue";
</script>

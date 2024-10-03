<template>
  <el-page-header @back="goBack">
    <!-- #region::Breadcrums -->
    <template #breadcrumb>
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
    <!-- #endregion::Breadcrums -->

    <!-- #region::Title -->
    <template #content>
      <span class="text-large font-600 mr-3"> {{ title }} </span>
    </template>
    <!-- #endregion::Title -->

    <!-- #region::Main options -->
    <template #extra>
      <div class="flex items-center">
        <el-button>
          <el-icon class="el-icon--left"><FolderAdd /></el-icon>New folder
        </el-button>
        <el-button type="primary" @click="emit('upload-click')">
          <el-icon class="el-icon--left"><Upload /></el-icon>Upload files
        </el-button>
        <el-button type="primary" :icon="Share" />
      </div>
    </template>
    <!-- #endregion::Main options -->

    <!-- #region::Description -->
    <div class="mt-4 text-sm font-bold">
      <el-descriptions size="small" border>
        <el-descriptions-item label="Folders">
          {{ directoriesCount }}
        </el-descriptions-item>
        <el-descriptions-item label="Files">{{ mediasCount }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- #endregion::Description -->
  </el-page-header>
</template>

<script setup lang="ts">
import type { Directory } from "../interfaces";
import { Share } from "@element-plus/icons-vue";

const props = defineProps<{
  title: string;
  history: Directory[];
  mediasCount: number;
  directoriesCount: number;
}>();

/* -------------------------------- Functions ------------------------------- */

const isLast = (index: number) => {
  return index === props.history.length - 1;
};

const goBack = () => {
  if (props.history.length < 2) return;

  const loadDirectory = props.history[props.history.length - 2];
  emit("change-directory", loadDirectory);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits({
  "change-directory": (directory: Directory) => directory,
  "upload-click": () => {},
});
</script>

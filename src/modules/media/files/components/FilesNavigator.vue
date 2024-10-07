<template>
  <el-page-header @back="goBack">
    <!-- #region::Breadcrums -->
    <template #breadcrumb>
      <Navigator.NavigatorBreadcrumb
        :history="history"
        @change-directory="$emit('change-directory', $event)"
      />
    </template>
    <!-- #endregion::Breadcrums -->

    <!-- #region::Title -->
    <template #content>
      <span class="text-large font-600 mr-3"> {{ title }} </span>
    </template>
    <!-- #endregion::Title -->

    <!-- #region::Main options -->
    <template #extra>
      <Navigator.NavigatorOptions
        @upload-click="$emit('upload-click')"
        @create-folder="$emit('create-folder')"
      />
    </template>
    <!-- #endregion::Main options -->

    <!-- #region::Description -->
    <Navigator.NavigatorDescription
      :medias-count="mediasCount"
      :directories-count="directoriesCount"
    />
    <!-- #endregion::Description -->
  </el-page-header>
</template>

<script setup lang="ts">
import type { Directory } from "../interfaces";
import * as Navigator from "./navigator";

const props = defineProps<{
  title: string;
  history: Directory[];
  mediasCount: number;
  directoriesCount: number;
}>();

/* -------------------------------- Functions ------------------------------- */

const goBack = () => {
  if (props.history.length < 2) return;

  const loadDirectory = props.history[props.history.length - 2];
  emit("change-directory", loadDirectory);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits<{
  "change-directory": [directory: Directory];
  "upload-click": [];
  "create-folder": [];
}>();
</script>

<template>
  <el-dialog v-model="dialogVisible" width="400" @close="handleOnClose">
    <template #header>
      <h3>Saving Folder</h3>
      {{ media }}
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Media } from "../interfaces";

const dialogVisible = ref(false);
const media = ref<Media | null>(null);

const handleOnClose = () => {};

/* --------------------------------- Expose --------------------------------- */

defineExpose({
  open: (item: Media) => {
    console.log(item);

    dialogVisible.value = true;
    media.value = item;
  },
});
</script>

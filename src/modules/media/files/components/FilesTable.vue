<template>
  <el-table
    v-loading="isLoading"
    :data="files"
    table-layout="fixed"
    @row-dblclick="handleItemSelection"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Name">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><component :is="getFileIcon(scope.row.type)" /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.attributes.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Date modified">
      <template #default="scope">
        <span>{{ scope.row.attributes.updatedAt }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="Type" />
    <el-table-column prop="attributes.humanReadableSize" label="Size" />
  </el-table>
  {{ selectedFiles }}
</template>

<script setup lang="ts" generic="T">
import { defineProps, ref } from "vue";
import { getFileIcon } from "../helpers/fileIconFormat";

defineProps<{ files: T[]; isLoading: boolean }>();

const selectedFiles = ref<T[]>([]);

const handleSelectionChange = (selection: T[]) => {
  selectedFiles.value = selection;
};

const handleItemSelection = (row: T) => {
  emit("item-selected", row);
};

const emit = defineEmits({
  "item-selected": (item: T) => item,
});
</script>

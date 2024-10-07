<template>
  <el-table
    v-loading="isLoading"
    :data="files"
    table-layout="fixed"
    @row-dblclick="$emit('item-selected', $event)"
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
    <el-table-column
      prop="attributes.createdAt"
      label="Date modified"
      :formatter="formatDateColumn"
    />
    <el-table-column prop="type" label="Type" />
    <el-table-column prop="attributes.humanReadableSize" label="Size" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button
          :icon="View"
          size="small"
          circle
          @click.prevent="handlePreviewItem(scope.row)"
        />
        <el-button
          :icon="Edit"
          size="small"
          circle
          @click.prevent="handleEditItem(scope.row)"
        />
        <el-button :icon="Delete" size="small" circle />
      </template>
    </el-table-column>
  </el-table>
  {{ selectedFiles }}
</template>

<script setup lang="ts" generic="T">
import { Delete, Edit, View } from "@element-plus/icons-vue";
import { defineProps, ref } from "vue";
import { formatDate } from "@/helpers/dateUtils";
import { getFileIcon } from "../helpers/fileIconFormat";

/* ------------------------------ Refs & Props ------------------------------ */

defineProps<{ files: T[]; isLoading: boolean }>();

const selectedFiles = ref<T[]>([]);

/* -------------------------------- Functions ------------------------------- */

const handleSelectionChange = (selection: T[]) => {
  selectedFiles.value = selection;
};

const handleEditItem = (item: T) => {
  emit("edit-item", item);
};

const handlePreviewItem = (item: T) => {
  emit("preview-item", item);
};

const formatDateColumn = (_row: any, _column: any, cellValue: string) => {
  return formatDate(cellValue);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits({
  "item-selected": (item: T) => item,
  "edit-item": (item: T) => item,
  "preview-item": (item: T) => item,
});
</script>

<template>
  <el-table
    v-loading="isLoading"
    :data="files"
    table-layout="fixed"
    @row-dblclick="$emit('item-selected', $event)"
    @selection-change="handleSelectionChange"
  >
    <!-- #region::Checkbox -->
    <el-table-column type="selection" width="55" />
    <!-- #endregion::Checkbox -->

    <!-- #region::Icon -->
    <el-table-column width="40">
      <template #default="scope">
        <el-icon>
          <component :is="getFileIcon(scope.row.attributes.mimeType)" />
        </el-icon>
      </template>
    </el-table-column>
    <!-- #endregion::Icon -->

    <!-- #region::Name -->
    <el-table-column label="Name" prop="attributes.name" show-overflow-tooltip />
    <!-- #endregion::Name -->

    <!-- #region::Date modified -->
    <el-table-column
      prop="attributes.createdAt"
      label="Date modified"
      :formatter="formatDateColumn"
    />
    <!-- #endregion::Date modified -->

    <!-- #region::Type -->
    <el-table-column prop="type" label="Type" />
    <!-- #endregion::Type -->

    <!-- #region::Size -->
    <el-table-column prop="attributes.humanReadableSize" label="Size" />
    <!-- #endregion::Size -->

    <!-- #region::Operations -->
    <el-table-column fixed="right" label="Operations" min-width="120" align="right">
      <template #default="scope">
        <el-button
          v-if="scope.row.attributes.mimeType"
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
    <!-- #endregion::Operations -->
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

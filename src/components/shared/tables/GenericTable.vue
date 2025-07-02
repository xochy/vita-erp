<template>
  <slot name="options"></slot>
  <el-table
    v-loading="isLoading"
    :data="data"
    style="width: 100%"
    height="640"
    @sort-change="onSortChange"
  >
    <!-- #region::Translations (Optional) -->
    <el-table-column v-if="showTranslationsColumn" fixed type="expand" align="left">
      <template #default="props">
        <TranslationsList :path="props.row.relationships.translations.links.related" />
      </template>
    </el-table-column>
    <!-- #endregion::Translations -->

    <!-- #region::Main identifiable column (e.g., Name, Title) -->
    <el-table-column
      :prop="mainColumnProp"
      :label="mainColumnLabel"
      sortable="custom"
      min-width="120"
      width="200"
    >
      <template #default="props">
        <el-link v-if="useLinkForMainColumn" @click="handleLoadItem(props.row)">
          {{ getItemAttribute(props.row, mainColumnAttributePath) }}
        </el-link>
        <span v-else>{{ getItemAttribute(props.row, mainColumnAttributePath) }}</span>
      </template>
    </el-table-column>
    <!-- #endregion::Main identifiable column -->

    <!-- #region::Description Column (Optional, but common) -->
    <el-table-column
      v-if="showDescriptionColumn"
      prop="attributes.description"
      label="Description"
      min-width="200"
    />
    <!-- #endregion::Description Column -->

    <!-- #region::Custom Columns via Slots -->
    <slot name="columns"></slot>
    <!-- #endregion::Custom Columns via Slots -->

    <!-- #region::Actions -->
    <ActionsColumn v-if="canModify" @edit="handleEditItem" @delete="handleDeleteItem" />
    <!-- #endregion::Actions -->

    <!-- #region::Empty table message -->
    <template v-if="!isLoading" #empty>
      <TableEmptyResult :message="emptyMessage" />
    </template>
    <!-- #endregion::Empty table message -->
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts" generic="T extends GenericModel = GenericModel">
import ActionsColumn from "@/components/shared/tables/colums/ActionsColumn.vue";
import TableEmptyResult from "@/components/shared/tables/TableEmptyResult.vue";
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import { useRouter } from "vue-router";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { handleSortChange as handleModelSortChange } from "@/modules/shared/utilities/UseModelSortHandler"; // Import with alias
import type { ModelLinks } from "@/modules/shared/translations/interfaces";

/* ------------------------------ Interfaces ------------------------------ */

export interface GenericModel {
  id: string | number;
  type: string;
  attributes: {
    [key: string]: any;
  };
  relationships?: {
    translations?: ModelLinks;
    [key: string]: any;
  };
}

/* ------------------------------ Props & Emits ------------------------------ */

const props = defineProps<{
  data: T[];
  isLoading: boolean;
  emptyMessage: string;
  canModify?: boolean;
  routerNameForSaving: string;
  mainColumnProp: string;
  mainColumnLabel: string;
  mainColumnAttributePath: string;
  useLinkForMainColumn?: boolean;
  showTranslationsColumn?: boolean;
  showDescriptionColumn?: boolean;
  deleteAction: (id: number) => Promise<any>;
}>();

// Updated emit signature for 'sort-change' to expect a string
const emit = defineEmits<{
  (event: "sort-change", value: string): void; // Changed from { prop, order } to string
  (event: "load-item", item: T): void;
  (event: "edit-item", id: number): void;
}>();

const router = useRouter();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- Functions ------------------------------- */

const getItemAttribute = (item: GenericModel, path: string): any => {
  const parts = path.split(".");
  let current: any = item;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
};

const handleLoadItem = (item: T): void => {
  emit("load-item", item);
};

const handleEditItem = (itemId: number): void => {
  emit("edit-item", itemId);
};

const handleDeleteItem = handleDelete(
  "Are you sure you want to delete this item?",
  "Deleting",
  props.deleteAction
);

/**
 * @description Handle the sorting of the table.
 * @param {{ prop: string; order: string }} { prop, order }
 */
const onSortChange = ({ prop, order }: { prop: string; order: string }): void => {
  // Use the imported handleModelSortChange from UseModelSortHandler.ts
  handleModelSortChange({ prop, order }, emit);
};
</script>

<style scoped>
.el-link {
  cursor: pointer;
  font-size: 13px;
}
</style>

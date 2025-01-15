<template>
  <slot name="options"></slot>
  <el-table
    v-loading="isLoading"
    :data="categories"
    style="width: 100%"
    height="480"
    @sort-change="handleSortChange"
  >
    <!-- #region::Translations -->
    <el-table-column fixed type="expand" align="left">
      <template #default="props">
        <TranslationsList :path="props.row.relationships.translations.links.related" />
      </template>
    </el-table-column>
    <!-- #endregion::Translations -->

    <!-- #region::Name -->
    <el-table-column
      prop="name"
      label="Name"
      sortable="custom"
      min-width="120"
      width="200"
    >
      <template #default="props">
        <el-link @click="handleLoadCategory(props.row)">
          {{ props.row.attributes.name }}
        </el-link>
      </template>
    </el-table-column>
    <!-- #endregion::Name -->

    <!-- #region::Description -->
    <el-table-column prop="attributes.description" label="Description" />
    <!-- #endregion::Description -->

    <!-- #region::Actions -->
    <ActionsColumn
      v-if="can.modify"
      @edit="handleEditCategory"
      @delete="handleDeleteCategory"
    />
    <!-- #endregion::Actions -->

    <!-- #region::Empty table message -->
    <template v-if="!isLoading" #empty>
      <TableEmptyResult message="No categories found." />
    </template>
    <!-- #endregion::Empty table message -->
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import ActionsColumn from "@/components/shared/tables/colums/ActionsColumn.vue";
import TableEmptyResult from "@/components/shared/tables/TableEmptyResult.vue";
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import type { Category } from "../interfaces";
import useCategory from "../composables/UseCategoryStore";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { useRouter } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ categories: Category[]; isLoading: boolean }>();

const route = useRouter();
const { can, deleteCategory } = useCategory();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the category details.
 * @param {Category} category
 * @returns {void}
 */
const handleLoadCategory = (category: Category): void => {
  route.push({
    name: "categories-saving",
    params: { id: String(category.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a category.
 * @param {number} categoryId
 * @returns {void}
 */
const handleEditCategory = (categoryId: number): void => {
  route.push({
    name: "categories-saving",
    params: { id: String(categoryId), tab: "categoryData" },
  });
};

/**
 * @description Handle the deletion of a category.
 */
const handleDeleteCategory = handleDelete(
  "Are you sure you want to delete this category?",
  "Deleting",
  deleteCategory
);

/**
 * @description Handle the sorting of the table.
 * @param {{ prop: string; order: string }} { prop, order }
 */
const handleSortChange = ({ prop, order }: { prop: string; order: string }): void => {
  let sortValue = "";
  if (order === "ascending") {
    sortValue = prop;
  } else if (order === "descending") {
    sortValue = `-${prop}`;
  }
  emit("sort-change", sortValue);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["sort-change"]);
</script>

<style scoped>
.el-link {
  cursor: pointer;
  font-size: 13px;
}
</style>

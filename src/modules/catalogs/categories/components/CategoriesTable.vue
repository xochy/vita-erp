<template>
  <el-table v-loading="isLoading" :data="categories" style="width: 100%" height="480">
    <el-table-column fixed type="expand" align="left">
      <template #default="props">
        <TranslationsList :path="props.row.relationships.translations.links.related" />
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template #default="props">
        <el-link @click="handleLoadCategory(props.row)">{{
          props.row.attributes.name
        }}</el-link>
      </template>
    </el-table-column>
    <el-table-column prop="attributes.description" label="Description" width="960" />
    <el-table-column
      v-if="can.modify"
      fixed="right"
      label="Operations"
      align="right"
      min-width="120"
    >
      <template #default="props">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleEditCategory(props.row.id)"
          >Edit</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleDeleteCategory(props.row.id)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import type { Category } from "../interfaces";
import useCategory from "../composables/UseCategoryStore";
import { useRouter } from "vue-router";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";

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
</script>

<style scoped>
.el-link {
  cursor: pointer;
  font-size: 13px;
}
</style>

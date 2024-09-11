<template>
  <el-table
    v-loading="isLoading"
    :data="categories"
    style="width: 100%"
    height="480"
    @expand-change="onExpandChange"
  >
    <el-table-column fixed type="expand" align="left">
      <template #default="props">
        <TranslationsList :path="props.row.relationships.translations.links.related" />
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template #default="props">
        <el-link @click="loadCategory(props.row)">{{
          props.row.attributes.name
        }}</el-link>
      </template>
    </el-table-column>
    <el-table-column prop="attributes.description" label="Description" width="960" />
    <el-table-column fixed="right" label="Operations" align="right" min-width="120">
      <template #default>
        <el-button link type="primary" size="small">Edit</el-button>
        <el-button link type="primary" size="small">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import type { Category } from "../interfaces";
import { useRouter } from "vue-router";
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";

defineProps<{ categories: Category[]; isLoading: boolean }>();

const route = useRouter();

const loadCategory = (category: Category) => {
  route.push({ name: "categories-saving", params: { id: String(category.id) } });
};

// handle the category saved event
const handleCategorySaved = (category: Category) => {
  console.log("Category saved:", category);
  // Update the categories list or perform any other necessary actions
};

const onExpandChange = (row: Category, expandedRows: []) => {
  if (!expandedRows.length) {
    return;
  }

  // getPath(row.relationships.translations.links.related)
};
</script>

<style scoped>
.el-link {
  cursor: pointer;
  font-size: 13px;
}
</style>

<template>
  <div>
    <el-table v-loading="isLoading" :data="categories" style="width: 100%" height="480" @expand-change="onExpandChange">
      <el-table-column type="expand">
        <template #default="props">Hola</template>
      </el-table-column>
      <el-table-column fixed prop="attributes.name" label="Name" width="180" />
      <el-table-column prop="attributes.description" label="Description" />
      <el-table-column label="Operations" align="right">
        <template #default>
          <el-button link type="primary" size="small">Edit</el-button>
          <el-button link type="primary" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <slot name="pagination"></slot>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "../interfaces";
import { useRouter } from "vue-router";

interface Props {
  categories: Category[];
  isLoading: boolean;
}

defineProps<Props>();

const route = useRouter();

// show the modal
const loadCategory = (category: Category) => {
  // Go to the category saving route with category id
  route.push({ name: "categories-saving", params: { id: category.id } });
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

  console.log("Row expanded:", row.relationships.translations.links);
};
</script>

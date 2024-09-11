<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching categories."
  />

  <CategoriesTable v-else :is-loading="isLoading" :categories="categories">
    <template #pagination>
      <el-pagination
        class="center-pagination"
        v-model:current-page="currentPage"
        v-model:page-size="perPage"
        :page-sizes="[5, 10, 15, 20]"
        :disabled="isLoading"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getPage"
        @current-change="getPage"
      />
    </template>
  </CategoriesTable>
</template>

<script setup lang="ts">
import CategoriesTable from "../components/CategoriesTable.vue";
import useCategories from "../composables/UseCategoriesStore";

const FIELDS_SET = "name,description,createdAt,translations";

const {
  categories,
  getPage,
  status: { isLoading, isError },
  pagination: { currentPage, perPage, total },
} = useCategories(FIELDS_SET);
</script>

<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching categories."
  />

  <CategoriesTable
    v-else
    :is-loading="isLoading"
    :categories="categories"
    @sort-change="getSortBy"
  >
    <template #options>
      <el-row class="mb-5">
        <el-col :span="6">
          <TableSearcher @search="getSearchBy" />
        </el-col>
      </el-row>
    </template>
    <template #pagination>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="perPage"
        class="center-pagination"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :disabled="isLoading"
        :total="total"
        @size-change="getPerPage"
        @current-change="getPage"
      />
    </template>
  </CategoriesTable>
</template>

<script setup lang="ts">
import CategoriesTable from "../components/CategoriesTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import useCategories from "../composables/UseCategoriesStore";

const FIELDS_SET = "name,description,createdAt,translations";

const {
  categories,
  status: { isLoading, isError },
  pag: { currentPage, perPage, total, getPage, getSortBy, getPerPage, getSearchBy },
} = useCategories(FIELDS_SET);
</script>

<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching plans."
  />

  <PlansTable v-else :is-loading="isLoading" :plans="plans" @sort-change="getSortBy">
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
        size="small"
        :page-sizes="[5, 10, 15, 20]"
        :disabled="isLoading"
        :total="total"
        @size-change="getPerPage"
        @current-change="getPage"
      />
    </template>
  </PlansTable>
</template>

<script setup lang="ts">
import PlansTable from "../components/PlansTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import usePlans from "../composables/UsePlansStore";

const FIELDS_SET = "name,createdAt,translations";

const {
  plans,
  status: { isLoading, isError },
  pag: { currentPage, perPage, total, getPage, getSortBy, getPerPage, getSearchBy },
} = usePlans(FIELDS_SET);
</script>

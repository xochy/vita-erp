<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching goals."
  />

  <PhysicalConditionsTable
    v-else
    :is-loading="isLoading"
    :physical-conditions="physicalConditions"
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
        size="small"
        :page-sizes="[5, 10, 15, 20]"
        :disabled="isLoading"
        :total="total"
        @size-change="getPerPage"
        @current-change="getPage"
      />
    </template>
  </PhysicalConditionsTable>
</template>

<script setup lang="ts">
import PhysicalConditionsTable from "../components/PhysicalConditionsTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import usePhysicalConditions from "../composables/UsePhysicalConditionsStore";

const FIELDS_SET = "name,description,createdAt,translations";

const {
  physicalConditions,
  status: { isLoading, isError },
  pag: { currentPage, perPage, total, getPage, getSortBy, getPerPage, getSearchBy },
} = usePhysicalConditions(FIELDS_SET);
</script>

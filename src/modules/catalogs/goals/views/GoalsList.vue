<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching goals."
  />

  <GoalsTable
    v-else
    :is-loading="isLoading"
    :goals="goals"
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
  </GoalsTable>
</template>

<script setup lang="ts">
import GoalsTable from '../components/GoalsTable.vue';
import TableSearcher from '@/components/shared/tables/TableSearcher.vue';
import useGoals from '../composables/UseGoalsStore';

const FIELDS_SET = 'name,description,createdAt,translations';

const {
  goals,
  status: { isLoading, isError },
  pag: { currentPage, perPage, total, getPage, getSortBy, getPerPage, getSearchBy },
} = useGoals(FIELDS_SET);
</script>
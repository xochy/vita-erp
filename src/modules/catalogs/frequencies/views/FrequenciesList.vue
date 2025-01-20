<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching frequencies."
  />

  <FrequenciesTable
    v-else
    :is-loading="isLoading"
    :frequencies="frequencies"
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
  </FrequenciesTable>
</template>

<script setup lang="ts">
import FrequenciesTable from '../components/FrequenciesTable.vue';
import TableSearcher from '@/components/shared/tables/TableSearcher.vue';
import useFrequencies from '../composables/UseFrequenciesStore';

const FIELDS_SET = 'name,description,createdAt,translations';

const {
  frequencies,
  status: { isLoading, isError },
  pag: { currentPage, perPage, total, getPage, getSortBy, getPerPage, getSearchBy },
} = useFrequencies(FIELDS_SET);
</script>
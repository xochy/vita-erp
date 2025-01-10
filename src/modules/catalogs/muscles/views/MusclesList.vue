<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching muscles."
  />

  <MusclesTable v-else :is-loading="isLoading" :muscles="muscles">
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
  </MusclesTable>
</template>

<script setup lang="ts">
import MusclesTable from '../components/MusclesTable.vue';
import useMuscles from '../composables/UseMusclesStore';

const FIELDS_SET = "name,description,createdAt,translations";

const {
  muscles,
  status: { isLoading, isError },
  pag: { currentPage, perPage, total, getPage },
} = useMuscles(FIELDS_SET);
</script>

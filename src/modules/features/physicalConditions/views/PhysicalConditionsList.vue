<template>
  <TableSkeleton v-if="isLoading" />

  <ErrorAlert v-else-if="isError" :content="error?.message" />

  <PhysicalConditionsTable v-else :physicalConditions="physicalConditions" />

  <TablePaginator
    v-if="!isLoading && !isError"
    :currentPage="currentPage"
    :from="from"
    :lastPage="lastPage"
    :perPage="perPage"
    :to="to"
    :total="total"
    :getPage="getPage"
  />
</template>

<script setup lang="ts">
import TableSkeleton from "@/components/shared/skeletons/TableSkeleton.vue";
import ErrorAlert from "@/components/shared/alerts/ErrorAlert.vue";
import PhysicalConditionsTable from "../components/PhysicalConditionsTable.vue";
import TablePaginator from "@/components/shared/tables/TablePaginator.vue";
import usePhysicalConditions from "../composables/UsePhysicalConditionsStore";

const {
  // #region::Pagination
  currentPage,
  from,
  lastPage,
  perPage,
  to,
  total,
  // #endregion::Pagination

  // #region::PhysicalConditions requests state
  isLoading,
  isError,
  error,
  // #endregion::PhysicalConditions requests state

  // #region::PhysicalConditions data
  getPage,
  physicalConditions,
  // #endregion::PhysicalConditions data

  // #region::PhysicalConditions permissions
  canCreatePhysicalConditions,
  // #endregion::PhysicalConditions permissions
} = usePhysicalConditions();
</script>

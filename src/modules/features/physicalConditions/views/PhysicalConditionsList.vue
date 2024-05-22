<template>
  <LoadingAlert v-if="isLoading" />

  <CustomAlert
    v-else-if="isError"
    :content="error?.message"
    :icon-type="'danger'"
    :icon="'cross-square'"
    :title-color="'danger'"
    :title="'Error'"
    :type="'danger'"
  />

  <PhysicalConditionsTable
    v-else
    :physicalConditions="physicalConditions"
    :is-loading="isLoading"
  />

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
import CustomAlert from "@/components/shared/alerts/CustomAlert.vue";
import LoadingAlert from "@/components/shared/alerts/LoadingAlert.vue";
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
} = usePhysicalConditions();
</script>

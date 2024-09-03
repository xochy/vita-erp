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

  <RolesTable
    v-else
    :roles="roles"
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
import CustomAlert from '@/components/shared/alerts/CustomAlert.vue';
import LoadingAlert from '@/components/shared/alerts/LoadingAlert.vue';
import RolesTable from '../components/RolesTable.vue'
import TablePaginator from '@/components/shared/tables/TablePaginator.vue'
import useRoles from '../composables/UseRolesStore';

const {
  // #region::Pagination
  currentPage,
  from,
  lastPage,
  perPage,
  to,
  total,
  // #endregion::Pagination

  // #region::Roles requests state
  isLoading,
  isError,
  error,
  // #endregion::Roles requests state

  // #region::Roles data
  getPage,
  roles,
  // #endregion::Roles data

  // #region::Roles permissions
  canCreateRoles,
  // #endregion::Roles permissions
} = useRoles();
</script>
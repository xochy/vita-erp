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

  <UsersTable
    v-else
    :users="users"
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
import UsersTable from '../components/UsersTable.vue';
import TablePaginator from '@/components/shared/tables/TablePaginator.vue';
import useUsers from '../composables/UseUsersStore';

const {
  // #region::Pagination
  currentPage,
  from,
  lastPage,
  perPage,
  to,
  total,
  // #endregion::Pagination

  // #region::Users requests state
  isLoading,
  isError,
  error,
  // #endregion::Users requests state

  // #region::Users data
  getPage,
  users,
  // #endregion::Users data

  // #region::Users permissions
  canCreateUsers,
  // #endregion::Users permissions
} = useUsers();

</script>
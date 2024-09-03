<template>
  <el-empty description="An error occurred while fetching users." v-if="isError" />

  <UsersTable v-else :is-loading="isLoading" :users="users">
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
  </UsersTable>
</template>

<script setup lang="ts">
import UsersTable from "../components/UsersTable.vue";
import useUsers from "../composables/UseUsersStore";

const {
  users,
  getPage,
  status: { isLoading, isError },
  pagination: { currentPage, perPage, total },
} = useUsers();
</script>

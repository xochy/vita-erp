<template>
  <el-table v-loading="isLoading" :data="users" style="width: 100%">
    <el-table-column fixed prop="attributes.name" label="Name" width="180" />
    <el-table-column prop="attributes.email" label="Email" width="250" />
    <el-table-column label="Operations" min-width="120" align="right">
      <template #default>
        <el-button link type="primary" size="small">Edit</el-button>
        <el-button link type="primary" size="small">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import type { User } from "../interfaces";
import { useRouter } from "vue-router";

interface Props {
  users: User[];
  isLoading: boolean;
}

defineProps<Props>();

const route = useRouter();

// show the modal
const loadUser = (user: User) => {
  // Go to the user saving route with user id
  route.push({ name: "users-saving", params: { id: user.id } });
};

// handle the user saved event
const handleUserSaved = (user: User) => {
  console.log("User saved:", user);
  // Update the users list or perform any other necessary actions
};
</script>

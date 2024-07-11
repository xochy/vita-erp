<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr class="fw-bold fs-6 text-gray-800">
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.attributes.name }}</td>
          <td>{{ user.attributes.email }}</td>
          <td>
            <div class="d-flex">
              <KTIcon
                icon-name="pencil"
                icon-class="fs-2 text-black mx-1"
                style="cursor: pointer"
                @click="loadUser(user)"
                data-bs-toggle="modal"
                data-bs-target="#user_saving_modal"
              />
              <KTIcon
                icon-name="trash"
                icon-class="fs-2 text-black mx-1"
                style="cursor: pointer"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <UsersSavingModal ref="UsersSavingModalRef" @onSavingUser="handleUserSaved" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { User } from "../interfaces";
import UsersSavingModal from "@/modules/accounts/users/components/UsersSavingModal.vue";

interface Props {
  users: User[];
}

defineProps<Props>();

// ref to the modal
const UsersSavingModalRef = ref<InstanceType<
  typeof UsersSavingModal
> | null>(null);

// show the modal
const loadUser = (user: User) => {
  UsersSavingModalRef.value?.loadUser({ ...user });
};

// handle the user saved event
const handleUserSaved = (user: User) => {
  console.log("User saved:", user);
  // Update the users list or perform any other necessary actions
};
</script>

<style scoped>
.btn-extra-sm {
  font-size: 0.2rem;
  border-radius: 0.2rem;
}
</style>
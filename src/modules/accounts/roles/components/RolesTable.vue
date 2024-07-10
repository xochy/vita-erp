<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr class="fw-bold fs-6 text-gray-800">
          <th>Name</th>
          <th>Display name</th>
          <th>Default</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.attributes.name }}</td>
          <td>{{ role.attributes.display_name }}</td>
          <td>{{ role.attributes.default ? 'Yes' : 'No' }}</td>
          <td>
            <div class="d-flex">
              <KTIcon
                icon-name="pencil"
                icon-class="fs-2 text-black mx-1"
                style="cursor: pointer"
                @click="loadRole(role)"
                data-bs-toggle="modal"
                data-bs-target="#role_saving_modal"
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
  <RoleSavingModal ref="RoleSavingModalRef" @onSavingRole="handleRoleSaved" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Role } from "../interfaces";
import RoleSavingModal from "@/modules/accounts/roles/components/RoleSavingModal.vue";

interface Props {
  roles: Role[];
}

defineProps<Props>();

// ref to the modal
const RoleSavingModalRef = ref<InstanceType<
  typeof RoleSavingModal
> | null>(null);

// show the modal
const loadRole = (role: Role) => {
  RoleSavingModalRef.value?.loadRole({ ...role });
};

// handle the role saved event
const handleRoleSaved = (role: Role) => {
  console.log("Role saved:", role);
  // Update the roles list or perform any other necessary actions
};
</script>

<style scoped>
.btn-extra-sm {
  font-size: 0.2rem;
  border-radius: 0.2rem;
}
</style>
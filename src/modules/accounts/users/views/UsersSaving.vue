<template>
  <el-form
    v-loading="isLoading"
    id="user_saving_form"
    ref="userSavingFormRef"
    class="form"
    :model="user"
    :rules="rules"
    @submit.prevent="submit()"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <NameInput v-model="user.attributes.name" />
      </el-col>
      <el-col :span="12">
        <EmailInput v-model="user.attributes.email" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <PasswordInput v-model="user.attributes.password" />
      </el-col>
      <el-col :span="12">
        <PasswordConfirmationInput v-model="user.attributes.password_confirmation" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <RoleSelect v-model="user.relationships!.roles.data" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <CancelButton />
        <SubmitButton :isLoading="isLoading" />
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import type { User } from "../interfaces";
import useUser from "../composables/UseUserStore";
import { ref, onMounted } from "vue";
import { rules } from "../validation/userFormValidationRules";
import { useRoute } from "vue-router";

import {
  NameInput,
  EmailInput,
  RoleSelect,
  SubmitButton,
  CancelButton,
  PasswordInput,
  PasswordConfirmationInput,
} from "../components/form";

/* ---------------------------------- Props --------------------------------- */

const userSavingFormRef = ref<null | HTMLFormElement>(null);
const { user, getUser, isLoading, createUser, updateUser } = useUser();
const route = useRoute();

/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  loadUser();
});

/* -------------------------------- Functions ------------------------------- */

/**
 * @description submit the form
 * @returns {void}
 */
const submit = (): void => {
  if (!userSavingFormRef.value) {
    return;
  }

  userSavingFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (user.value.id) {
        updateUser(user.value);
      } else {
        createUser(user.value);
      }
    }
  });
};

/**
 * @description load the user data to the form if user ID exists in route
 * @returns {Promise<void>}
 */
const loadUser = async (): Promise<void> => {
  const userId = route.params.id;
  if (userId) {
    getUser(userId.toString());
  }
};

/* ---------------------------------- Emits --------------------------------- */

/**
 * @description emit the event when the role is saved
 */
const emitUserSaved = defineEmits<{
  onSavingUser: [user: User];
}>();

/* --------------------------------- Expose --------------------------------- */

defineExpose({ loadUser });
</script>

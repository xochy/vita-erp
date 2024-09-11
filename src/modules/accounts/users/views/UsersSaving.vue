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
        <Form.NameInput v-model="user.attributes.name" />
      </el-col>
      <el-col :span="12">
        <Form.EmailInput v-model="user.attributes.email" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <Form.PasswordInput v-model="user.attributes.password" />
      </el-col>
      <el-col :span="12">
        <Form.PasswordConfirmationInput v-model="user.attributes.password_confirmation" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <Form.RoleSelect v-model="user.relationships!.roles.data" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <Form.CancelButton />
        <Form.SubmitButton :isLoading="isLoading" />
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import type { User } from "@/modules/accounts/users/interfaces";
import useUser from "@/modules/accounts/users/composables/UseUserStore";
import { ref, onMounted } from "vue";
import { rules } from "@/modules/accounts/users/validation/userFormValidationRules";
import { useRoute } from "vue-router";
import * as Form from "../components/form";

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
  if (!userSavingFormRef.value) return;

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

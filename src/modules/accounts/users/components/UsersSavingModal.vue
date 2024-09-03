<template>
  <BasicModal id="user_saving_modal" ref="basicModalRef">
    <!-- #region::form -->
    <el-form
      id="user_saving_form"
      ref="userSavingFormRef"
      class="form"
      :model="user"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <BasicModalHeading title="User" description="User saving modal" />

      <NameInput v-model="user.attributes.name" />
      <EmailInput v-model="user.attributes.email" />
      <PasswordInput v-model="user.attributes.password" />
      <PasswordConfirmationInput v-model="user.attributes.password_confirmation" />
      <RoleSelect v-model="user.relationships!.roles.data" />

      <!-- #region::actions -->
      <div class="text-center">
        <!-- #region::Cancel button -->
        <button type="reset" class="btn btn-light me-3">Cancel</button>
        <!-- #endregion::Cancel button -->

        <!-- #region::submit button -->
        <button
          :data-kt-indicator="isLoading ? 'on' : null"
          class="btn btn-lg btn-primary"
          type="submit"
        >
          <span v-if="!isLoading" class="indicator-label"> Submit </span>
          <span v-if="isLoading" class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <!-- #endregion::submit button -->
      </div>
      <!-- #endregion::actions -->
    </el-form>
    <!-- #endregion::form -->
  </BasicModal>
</template>

<script setup lang="ts">
import ApiService from "@/core/services/ApiService";
import BasicModal from "@/components/modals/generics/BasicModal.vue";
import BasicModalHeading from "@/components/modals/generics/BasicModalHeading.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import type { RelatedRole } from "../interfaces/User";
import type { User, UserResponse } from "../interfaces";
import useRolesFlat from "../composables/UseRolesFlatStore";
import { hideModal, removeModalBackdrop } from "@/core/helpers/modal";
import { ref } from "vue";
import { rules } from "../validation/userFormValidationRules";
import { useMutation } from "@tanstack/vue-query";

import {
  NameInput,
  EmailInput,
  PasswordInput,
  PasswordConfirmationInput,
  RoleSelect,
} from "./form";

/* ---------------------------------- Props --------------------------------- */

const userSavingFormRef = ref<null | HTMLFormElement>(null);
const basicModalRef = ref<InstanceType<typeof BasicModal> | null>(null);
const isLoading = ref<boolean>(false);

const { rolesFlat } = useRolesFlat();

const user = ref<User>({
  id: "",
  type: "users",
  attributes: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  relationships: {
    roles: {
      data: [],
    },
  },
});

/* -------------------------------- Functions ------------------------------- */

const submit = () => {
  if (!userSavingFormRef.value) {
    return;
  }

  userSavingFormRef.value.validate(async (valid: boolean) => {
    console.log(user.value.relationships?.roles.data);

    if (valid) {
      isLoading.value = true;

      if (user.value.id) {
        await updateUser(user.value);
      } else {
        await createUser();
      }

      isLoading.value = false;

      Swal.fire({
        text: "Form has been successfully submitted!",
        icon: "success",
        buttonStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then(() => {
        hideModal(basicModalRef.value!.reference);
        removeModalBackdrop();
        emitUserSaved("onSavingUser", user.value);
      });
    }
  });
};

/**
 * @description load the user data to the form
 */
const loadUser = async (selectedUser: User) => {
  user.value = JSON.parse(JSON.stringify(selectedUser));

  const relatedRolesIds =
    selectedUser.relationships?.relatedRoles?.data?.map((role: RelatedRole) => role.id) ||
    [];
  const userRolesFlat = rolesFlat.value.filter((role) =>
    relatedRolesIds.includes(role.id.toString())
  );
  console.log(userRolesFlat);

  user.value.relationships!.roles.data = userRolesFlat;
};

/**
 * @description create a new user
 */
const createUser = async (): Promise<UserResponse> => {
  const { attributes, relationships } = user.value;
  const roles = relationships?.roles.data!.map((role) => ({
    type: "roles",
    id: role.id.toString(),
  }));

  const { data } = await ApiService.vueInstance.axios.post<UserResponse>("/users", {
    data: {
      type: "users",
      attributes,
      relationships: {
        roles: {
          data: roles,
        },
      },
    },
  });

  return data;
};

/**
 * @description update the user
 */
const updateUser = async (user: User): Promise<UserResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<UserResponse>(
    `/users/${user.id}`,
    {
      data: {
        type: "users",
        id: user.id,
        attributes: user.attributes,
      },
    }
  );

  return data;
};

/* ---------------------------------- Emits --------------------------------- */

/**
 * @description emit the event when the role is saved
 */
const emitUserSaved = defineEmits<{
  onSavingUser: [user: User];
}>();

const userMutation = useMutation({ mutationFn: updateUser });

/* --------------------------------- Expose --------------------------------- */

defineExpose({ loadUser });
</script>

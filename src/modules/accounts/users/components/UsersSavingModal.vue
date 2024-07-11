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
      <!-- #region::name field -->
      <FormItem
        name="attributes.name"
        label="Name"
        tooltip="Specify a user name for future usage and reference"
      >
        <el-input
          v-model="user.attributes.name"
          placeholder="Enter user name"
          name="attributes.name"
        ></el-input>
      </FormItem>
      <!-- #endregion::name field -->
      <!-- #region::email field -->
      <FormItem
        name="attributes.email"
        label="Email"
        tooltip="Specify a user email for future usage and reference"
      >
        <el-input
          v-model="user.attributes.email"
          placeholder="Enter user email"
          name="attributes.email"
        ></el-input>
      </FormItem>
      <!-- #endregion::email field -->
      <!-- #region::password field -->
      <FormItem
        name="attributes.password"
        label="Password"
        tooltip="Specify a user password for future usage and reference"
      >
        <el-input
          v-model="user.attributes.password"
          placeholder="Enter user password"
          name="attributes.password"
        ></el-input>
      </FormItem>
      <!-- #endregion::password field -->
      <!-- #region::password confirmation field -->
      <FormItem
        name="attributes.password_confirmation"
        label="Password confirmation"
        tooltip="Specify a user password confirmation for future usage and reference"
      >
        <el-input
          v-model="user.attributes.password_confirmation"
          placeholder="Enter user password confirmation"
          name="attributes.password_confirmation"
        ></el-input>
      </FormItem>
      <!-- #endregion::password confirmation field -->
      <!-- #region::roles tags -->
      <FormItem
        name="relationships.roles.data"
        label="Roles"
        tooltip="Select the roles that the user will have"
      >
        <el-select
          v-model="user.relationships!.roles.data"
          multiple
          filterable
          placeholder="Select roles"
          name="relationships.roles.data"
          value-key="id"
        >
          <el-option
            v-for="roleFlat in rolesFlat"
            :key="roleFlat.id"
            :label="roleFlat.display_name"
            :value="roleFlat"
          ></el-option>
        </el-select>
      </FormItem>
      <!-- #endregion::roles tags -->
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
import FormItem from "@/components/form/FormItem.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import type { User, UserResponse } from "../interfaces";
import { hideModal, removeModalBackdrop } from "@/core/helpers/modal";
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import useRolesFlat from "../composables/UseRolesFlatStore";
import type { RelatedRole } from "../interfaces/User";

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

const rules = ref({
  attributes: {
    name: [
      {
        required: true,
        message: "Please enter the user name",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Please enter the user email",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "Please enter the user password",
        trigger: "blur",
      },
    ],
    password_confirmation: [
      {
        required: true,
        message: "Please enter the user password confirmation",
        trigger: "blur",
      },
    ],
  },
  relationships: {
    roles: {
      data: [
        {
          required: true,
          message: "Please select at least one role",
          trigger: "change",
        },
      ],
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

      isLoading.value = true

      if (user.value.id) {
        await updateUser(user.value);
      } else {
        await createUser();
      }

      isLoading.value = false

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

  const relatedRolesIds = selectedUser.relationships?.relatedRoles?.data?.map((role: RelatedRole) => role.id) || [];
  const userRolesFlat = rolesFlat.value.filter(role => relatedRolesIds.includes(role.id.toString()));
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

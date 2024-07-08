<template>
  <BasicModal id="role_saving_modal" reference="roleSavingModalRef">
    <!-- #region::form -->
    <el-form
      id="role_saving_modal"
      ref="roleSavingFormRef"
      :model="editableRole"
      :rules="rules"
      class="form"
      @submit.prevent="submit()"
    >
      <!-- @submit.prevent="originalRole ? roleMutation.mutate(editableRole!) : createRole()" -->
      <BasicModalHeading title="Role" description="Role saving modal" />
      <!-- #region::name field -->
      <FormItem
        name="name"
        label="Name"
        tooltip="Specify a role name for future usage and reference"
      >
        <el-input
          v-model="nameModel"
          placeholder="Enter role name"
          name="name"
        ></el-input>
      </FormItem>
      <!-- #endregion::name field -->
      <!-- #region::display name field -->
      <FormItem
        name="display_name"
        label="Display Name"
        tooltip="Specify a role display name for future usage and reference"
      >
        <el-input
          v-model="displayNameModel"
          placeholder="Enter role display name"
          name="display_name"
        ></el-input>
      </FormItem>
      <!-- #endregion::display name field -->
      <!-- #region::actions -->
      <div class="text-center">
        <!-- #region::Cancel button -->
        <button type="reset" class="btn btn-light me-3">Cancel</button>
        <!-- #endregion::Cancel button -->
        <!-- #region::submit button -->
        <button
          :data-kt-indicator="!roleMutation.isPending ? 'on' : null"
          class="btn btn-lg btn-primary"
          type="submit"
        >
          <span v-if="roleMutation.isPending" class="indicator-label"> Submit </span>
          <span v-if="!roleMutation.isPending" class="indicator-progress">
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
import Modal from "bootstrap/js/dist/modal";
import type { Role, RoleResponse } from "../interfaces";
import { computed, ref, toRaw } from "vue";
import { useMutation } from "@tanstack/vue-query";

/* ---------------------------------- Props --------------------------------- */

const roleSavingFormRef = ref<null | HTMLFormElement>(null);
const roleSavingModalRef = ref<null | HTMLFormElement>(null);

const originalRole = ref<Role | null>(null);
const editableRole = ref<Role | null>(null);

const name = ref("");
const displayName = ref("");

const rules = ref({
  name: [
    {
      required: true,
      message: "Please enter the role name",
      trigger: "blur",
    },
  ],
  display_name: [
    {
      required: true,
      message: "Please enter the role display name",
      trigger: "blur",
    },
  ],
});

/* -------------------------------- Computed -------------------------------- */

const nameModel = computed({
  get: () => editableRole?.value?.attributes?.name || name.value,
  set: (value) => {
    if (editableRole && editableRole.value?.attributes) {
      editableRole.value.attributes.name = value;
    } else {
      name.value = value;
    }
  },
});

const displayNameModel = computed({
  get: () => editableRole?.value?.attributes?.display_name || displayName.value,
  set: (value) => {
    if (editableRole && editableRole.value?.attributes) {
      editableRole.value.attributes.display_name = value;
    } else {
      displayName.value = value;
    }
  },
});

/* -------------------------------- Functions ------------------------------- */

const submit = () => {
  if (!roleSavingFormRef.value) {
    return;
  }

  roleSavingFormRef.value.validate((valid: boolean) => {});
};

/**
 * @description Load the role to the modal
 */
const loadRole = (role: Role) => {
  originalRole.value = role;
  editableRole.value = JSON.parse(JSON.stringify(toRaw(role)));
};

/**
 * @description create the role
 * @returns {Promise<RoleResponse>}
 */
const createRole = async (): Promise<RoleResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<RoleResponse>(
    "/roles/manage/createRole",
    {
      data: {
        type: "roles",
        attributes: {
          name: name.value,
          display_name: displayName.value,
        },
      },
    }
  );

  return data;
};

/**
 * @description update the role
 * @param {Role} role
 * @returns {Promise<RoleResponse>}
 */
const updateRole = async (role: Role): Promise<RoleResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<RoleResponse>(
    `/roles/manage/updateRole`,
    {
      data: {
        type: "roles",
        id: role.id,
        attributes: role.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Show the modal
 */
const showModal = () => {
  // @ts-ignore
  const modal = new Modal(document.getElementById("role_saving_modal"));
  modal.show();
};

/**
 * @description hide the modal
 */
const hideModal = () => {
  // @ts-ignore
  const modal = new Modal(document.getElementById("role_saving_modal"));
  modal.hide();
};

const resetForNewModel = () => {
  editableRole.value = null;
  originalRole.value = null;
  name.value = "";
  displayName.value = "";
};

/**
 * @description mutation to create the role
 */
const roleMutation = useMutation({ mutationFn: updateRole });

/* --------------------------------- Expose --------------------------------- */

defineExpose({
  showModal,
  loadRole,
});
</script>

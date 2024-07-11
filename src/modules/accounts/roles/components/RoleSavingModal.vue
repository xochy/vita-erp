<template>
  <BasicModal id="role_saving_modal" ref="basicModalRef">
    <!-- #region::form -->
    <el-form
      id="role_saving_form"
      ref="roleSavingFormRef"
      class="form"
      :model="role"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <BasicModalHeading title="Role" description="Role saving modal" />
      <!-- #region::name field -->
      <FormItem
        name="attributes.name"
        label="Name"
        tooltip="Specify a role name for future usage and reference"
      >
        <el-input
          v-model="role.attributes.name"
          placeholder="Enter role name"
          name="attributes.name"
        ></el-input>
      </FormItem>
      <!-- #endregion::name field -->
      <!-- #region::display name field -->
      <FormItem
        name="attributes.display_name"
        label="Display name"
        tooltip="Specify a role display name for future usage and reference"
      >
        <el-input
          v-model="role.attributes.display_name"
          placeholder="Enter role display name"
          name="attributes.display_name"
        ></el-input>
      </FormItem>
      <!-- #endregion::display name field -->
      <!-- #region::permissions tags -->
      <FormItem
        name="relationships.permissions.data"
        label="Permissions"
        tooltip="Select the permissions that the role will have"
      >
        <el-select
          v-model="role.relationships!.permissions.data"
          multiple
          filterable
          allow-create
          placeholder="Select permissions"
          name="relationships.permissions.data"
        >
          <el-option
            v-for="permissionFlat in permissionsFlat"
            :key="permissionFlat.id"
            :label="permissionFlat.display_name"
            :value="permissionFlat.id"
          ></el-option>
        </el-select>
      </FormItem>
      <!-- #endregion::permissions tags -->
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import type { Role, RoleResponse } from "../interfaces";
import { hideModal, removeModalBackdrop } from "@/core/helpers/modal";
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import usePermissionsFlat from "../composables/UsePermissionsFlatStore";

/* ---------------------------------- Props --------------------------------- */

const roleSavingFormRef = ref<null | HTMLFormElement>(null);
const basicModalRef = ref<InstanceType<typeof BasicModal> | null>(null);

const { permissionsFlat } = usePermissionsFlat();

const role = ref<Role>({
  id: "",
  type: "roles",
  attributes: {
    name: "",
    display_name: "",
  },
  relationships: {
    permissions: {
      data: [],
    },
  },
});

const rules = ref({
  attributes: {
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
  },
  relationships: {
    permissions: {
      data: [
        {
          required: true,
          message: "Please select at least one permission",
          trigger: "blur",
        },
      ],
    },
  },
});

/* -------------------------------- Functions ------------------------------- */

const submit = () => {
  if (!roleSavingFormRef.value) {
    return;
  }

  roleSavingFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (role.value.id) {
        await updateRole(role.value);
      } else {
        await createRole();
      }

      Swal.fire({
        text: "Form has been successfully submitted!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then(() => {
        hideModal(basicModalRef.value!.reference);
        removeModalBackdrop();
        emitRoleSaved("onSavingRole", role.value);
      });
    }
  });
};

/**
 * @description Load the role to the modal
 */
const loadRole = (selectedRole: Role) => {
  role.value = JSON.parse(JSON.stringify(selectedRole));
};

/**
 * @description create the role
 * @returns {Promise<RoleResponse>}
 */
const createRole = async (): Promise<RoleResponse> => {
  const { attributes, relationships } = role.value;
  const permissions = relationships?.permissions.data!.map((id) => ({
    type: "permissions",
    id,
  }));

  const { data } = await ApiService.vueInstance.axios.post<RoleResponse>(
    "/roles/manage/createRole",
    {
      data: {
        type: "roles",
        attributes,
        relationships: {
          permissions: {
            data: permissions,
          },
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

/* ---------------------------------- Emits --------------------------------- */

/**
 * @description emit the event when the role is saved
 */
const emitRoleSaved = defineEmits<{
  onSavingRole: [role: Role];
}>();

/**
 * @description mutation to create the role
 */
const roleMutation = useMutation({ mutationFn: updateRole });

/* --------------------------------- Expose --------------------------------- */

defineExpose({ loadRole });
</script>

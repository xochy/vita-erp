<template>
  <el-dialog v-model="dialogVisible" width="400" @close="handleOnClose">
    <template #header>
      <h3>Saving Folder</h3>
    </template>
    <el-form
      :model="directory"
      ref="savingFolderFormRef"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <NameInput v-model="directory.attributes.name" />
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit" :loading="isLoading">
          <span v-if="isLoading">Please wait...</span>
          <span v-else>Save</span>
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { rules } from "@/modules/media/files/validation/directoryFormValidation";
import useDirectory from "../composables/UseDirectoryStore";
import NameInput from "./fields/NameInput.vue";
import type { Directory, DirectoryResponse } from "../interfaces";

const dialogVisible = ref(false);
const savingFolderFormRef = ref<null | HTMLFormElement>(null);
const {
  editableDirectory: directory,
  isLoading,
  createDirectory,
  updateDirectory,
  clearEditableDirectory,
} = useDirectory();

const submit = () => {
  if (!savingFolderFormRef.value) return;

  savingFolderFormRef.value.validate(async (valid: any) => {
    if (!valid) return;

    if (directory.value.id) {
      updateDirectory(directory.value, {
        onSuccess: ({ data }: DirectoryResponse) => {
          dialogVisible.value = false;
          emit("update-directory", data);
        },
      });
    } else {
      createDirectory(directory.value, {
        onSuccess: ({ data }: DirectoryResponse) => {
          dialogVisible.value = false;
          emit("add-directory", data);
        },
      });
    }
  });
};

const handleOnClose = () => {
  clearEditableDirectory();
  savingFolderFormRef.value?.resetFields();
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits({
  "add-directory": (directory: Directory) => directory,
  "update-directory": (directory: Directory) => directory,
});

/* --------------------------------- Expose --------------------------------- */

defineExpose({
  open: () => {
    dialogVisible.value = true;
  },
});
</script>

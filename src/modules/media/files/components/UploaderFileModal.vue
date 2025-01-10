<template>
  <el-dialog v-model="dialogVisible" width="700" @close="handleOnClose">
    <template #header>
      <h3>Upload File</h3>
    </template>
    <el-upload
      v-model:file-list="files"
      ref="uploadRef"
      drag
      multiple
      :action="url"
      :headers="headers"
      :auto-upload="true"
      :before-upload="handleBeforeUpload"
      :on-error="handleOnError"
      :on-success="handleOnSuccess"
      :data="{ directoryId, path }"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">Files with a size less or equal than 1GB</div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadUserFile,
} from "element-plus";
import { ElNotification } from "element-plus";
import { computed, ref } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { handleBeforeUpload } from "../helpers/fileUploadingValidations";
import type { Media, MediaResponse } from "../interfaces";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ directoryId: string; path: string }>();

const dialogVisible = ref(false);
const uploadRef = ref<UploadInstance>();
const files = ref<UploadUserFile[]>([]);

/* -------------------------------- Computed -------------------------------- */

const url = computed(
  () => `${ApiService.vueInstance.axios.defaults.baseURL}directories/upload-directory-file`
);

const headers = computed(() => ({
  Authorization: `Bearer ${JwtService.getToken()}`,
}));

/* -------------------------------- Functions ------------------------------- */

const handleOnError = (error: any) => {
  ElNotification({
    title: "Error",
    message: extractErrorDetail(error),
    type: "error",
  });
};

const handleOnSuccess = (
  response: MediaResponse,
  uploadFile: UploadFile,
  _uploadFiles: UploadFiles
) => {
  ElNotification({
    title: "Success",
    message: `File ${uploadFile.name} uploaded successfully`,
    type: "success",
  });

  const { data: media } = response;
  emit("add-file", media);
};

const handleOnClose = () => {
  for (const file of files.value) {
    uploadRef.value?.abort(file as UploadFile);
    uploadRef.value?.clearFiles();
  }
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits({
  "add-file": (media: Media) => media,
});

/* --------------------------------- Expose --------------------------------- */

defineExpose({
  open: () => {
    dialogVisible.value = true;
  },
});
</script>

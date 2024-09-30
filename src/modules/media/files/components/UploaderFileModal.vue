<template>
  <el-dialog v-model="dialogVisible" title="Upload file" width="700">
    <el-upload
      drag
      multiple
      :http-request="uploadFiles"
      :auto-upload="true"
      :on-change="handleChange"
      :on-remove="handleChange"
      :before-upload="handleBeforeUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button v-if="canShowUploadButton" type="primary" @click="uploadFiles">
          Upload
        </el-button>
      </div>
    </template>
    {{ selectedFiles }}
    <el-progress v-show="canShowProgressPercentage" :percentage="percentage" />
  </el-dialog>
</template>

<script setup lang="ts">
import type { File as RequestFile } from "../interfaces";
import type { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { convertFileToBase64 } from "../helpers/fileFormatConverter";
import { handleBeforeUpload } from "../helpers/fileUploadingValidations";

/* ------------------------------ Props & Refs ------------------------------ */

const props = defineProps<{ percentage: number }>();

const dialogVisible = ref(true);
const selectedFiles = ref<UploadUserFile[]>([]);

/* -------------------------------- Computed -------------------------------- */

const canShowUploadButton = computed(() => selectedFiles.value.length > 0);
const canShowProgressPercentage = computed(
  () => props.percentage > 0 && props.percentage < 100
);

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Handles the change event of the file upload component
 * @param {UploadUserFile} _uploadFile - The file that was uploaded
 * @param {UploadUserFile[]} uploadFiles - The list of files that were uploaded
 */
const handleChange: UploadProps["onChange"] = (
  _uploadFile: UploadUserFile,
  uploadFiles: UploadUserFile[]
) => {
  selectedFiles.value = uploadFiles;
};

/**
 * @description Converts the selected files to Base64 and emits the event to upload them
 * @returns {Promise<void>}
 * @throws {Error} If the files cannot be converted to Base64
 */
const uploadFiles = async (): Promise<void> => {
  try {
    const base64Files = await Promise.all(
      selectedFiles.value.map((file) => convertFileToBase64(file))
    );
    const filesWithBase64Content = selectedFiles.value.map((file, index) => ({
      filename: file.name,
      content: base64Files[index],
    }));
    emit("upload-files", filesWithBase64Content);
  } catch (error) {
    ElMessage.error("Failed to convert files to Base64");
  }
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits({
  "upload-files": (files: RequestFile[]) => files,
});
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    action="#"
    list-type="picture-card"
    :auto-upload="false"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview" />
  </el-dialog>
</template>

<script setup lang="ts">
import type { UploadFile, UploadUserFile } from "element-plus";
import { computed, ref } from "vue";

/* ------------------------------ Props & Refs ------------------------------ */

interface Props {
  modelValue: UploadUserFile[];
}

const props = defineProps<Props>();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const fileList = computed({
  get: () => props.modelValue,
  set: (value: UploadUserFile[]) => emit("update:modelValue", value),
});

/* -------------------------------- Functions ------------------------------- */

const handleRemove = (file: UploadFile) => {
  fileList.value.splice(fileList.value.indexOf(file), 1);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};

const emit = defineEmits(["update:modelValue"]);
</script>

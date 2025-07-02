<template>
  <FormItem :name="name" :label="label" :tooltip="tooltip">
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
  </FormItem>
</template>

<script setup lang="ts">
import FormItem from "@/components/form/FormItem.vue"; // Asegúrate de la ruta correcta
import type { UploadFile, UploadUserFile } from "element-plus";
import { computed, ref } from "vue";
import { Plus, ZoomIn, Download, Delete } from "@element-plus/icons-vue"; // Importar iconos

interface Props {
  modelValue: UploadUserFile[];
  name?: string;
  label?: string;
  tooltip?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Images',
  label: 'Images',
  tooltip: 'Upload images for the item',
});
const emit = defineEmits(["update:modelValue"]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const fileList = computed({
  get: () => props.modelValue,
  set: (value: UploadUserFile[]) => emit("update:modelValue", value),
});

/* -------------------------------- Functions ------------------------------- */

const handleRemove = (file: UploadFile) => {
  // Ensure the file exists in fileList before trying to remove it
  const index = fileList.value.indexOf(file as UploadUserFile);
  if (index > -1) {
    const newList = [...fileList.value];
    newList.splice(index, 1);
    fileList.value = newList; // Actualizar el valor reactivo
  }
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log("Download file:", file);
  // Lógica para descargar el archivo (si es una URL existente)
};
</script>
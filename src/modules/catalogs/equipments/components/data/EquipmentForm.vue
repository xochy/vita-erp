<template>
  <GenericForm
    formTitle="Equipment Form"
    formId="equipment_saving_form"
    :composable="useEquipmentStoreInstance"
    :validationRules="equipmentRules"
    @saved="handleSaved"
  >
    <template #default="{ model }">
      <el-row :gutter="20">
        <el-col :span="12">
          <GenericTextInput
            v-model="model.attributes.name"
            name="attributes.name"
            label="Name"
            placeholder="Enter equipment name"
            tooltip="Specify an equipment name"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericTextInput
            v-model="model.attributes.description"
            name="attributes.description"
            label="Description"
            placeholder="Enter equipment description"
            tooltip="Specify an equipment description"
            type="textarea"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericImagesUploader v-model="images" />
        </el-col>
      </el-row>
    </template>
  </GenericForm>
</template>

<script setup lang="ts">
import GenericForm from "@/components/shared/forms/GenericForm.vue";
import { useEquipment } from "../../composables/UseEquipmentStore";
import GenericImagesUploader from "@/components/shared/forms/fields/GenericImagesUploader.vue";
import { rules as equipmentRules } from "@/modules/catalogs/equipments/validation/equipmentFormValidationRules";
import GenericTextInput from "@/components/shared/forms/fields/GenericTextInput.vue"; // Ajusta la ruta
import type { UploadUserFile } from "element-plus";
import { ref } from "vue";
import type { Media } from "@/modules/media/files/interfaces";

/* ------------------------------ Props & Refs ------------------------------ */

const props = defineProps<{ files: UploadUserFile[] }>();

const images = ref<UploadUserFile[]>(props.files || []);
const useEquipmentStoreInstance = useEquipment();

/* -------------------------------- Functions ------------------------------- */

const handleSaved = async () => {
  const equipmentId = useEquipmentStoreInstance.item.value.id;

  if (equipmentId && images.value.length && useEquipmentStoreInstance.uploadFiles) {
    await useEquipmentStoreInstance.uploadFiles(
      {
        itemId: equipmentId,
        files: images.value,
      },
      {
        onSuccess: ({ data }) => {
          emit("saved", data);
        },
      }
    );
  }
  else {
    emit("saved", []);
  }
};

/* --------------------------------- Emmits --------------------------------- */

const emit = defineEmits<{
  saved: [medias: Media[]];
}>();
</script>

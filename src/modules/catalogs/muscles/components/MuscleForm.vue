<template>
  <GenericForm
    formTitle="Muscle Form"
    formId="muscle_saving_form"
    :composable="useMuscleStoreInstance"
    :validationRules="rules"
    @saved="handleSaved"
  >
    <template #default="{ model }">
      <el-row :gutter="20">
        <el-col :span="12">
          <GenericTextInput
            v-model="model.attributes.name"
            name="attributes.name"
            label="Name"
            placeholder="Enter muscle name"
            tooltip="Specify a muscle name"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericTextInput
            v-model="model.attributes.description"
            name="attributes.description"
            label="Description"
            placeholder="Enter muscle description"
            tooltip="Specify a muscle description"
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
import GenericImagesUploader from "@/components/shared/forms/fields/GenericImagesUploader.vue";
import GenericTextInput from "@/components/shared/forms/fields/GenericTextInput.vue";
import type { Media } from "@/modules/media/files/interfaces";
import type { UploadUserFile } from "element-plus";
import { ref } from "vue";
import { rules } from "../validation/muscleFormValidationRules";
import { useMuscle } from "../composables/UseMuscleStore";

/* ------------------------------ Props & Refs ------------------------------ */

const props = defineProps<{ files: UploadUserFile[] }>();

const images = ref<UploadUserFile[]>(props.files || []);
const useMuscleStoreInstance = useMuscle();

/* -------------------------------- Functions ------------------------------- */

const handleSaved = async () => {
  const muscleId = useMuscleStoreInstance.item.value.id;

  if (muscleId && images.value.length && useMuscleStoreInstance.uploadFiles) {
    await useMuscleStoreInstance.uploadFiles(
      {
        itemId: muscleId,
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

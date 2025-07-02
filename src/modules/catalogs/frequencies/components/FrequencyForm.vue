<template>
  <GenericForm
    formTitle="Frequency Form"
    formId="frequency_saving_form"
    :composable="useFrequencyStoreInstance"
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
            placeholder="Enter frequency name"
            tooltip="Specify a frequency name"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericTextInput
            v-model="model.attributes.description"
            name="attributes.description"
            label="Description"
            placeholder="Enter frequency description"
            tooltip="Specify a frequency description"
            type="textarea"
          />
        </el-col>
      </el-row>
    </template>
  </GenericForm>
</template>

<script setup lang="ts">
import GenericForm from "@/components/shared/forms/GenericForm.vue";
import GenericTextInput from "@/components/shared/forms/fields/GenericTextInput.vue";
import type { Media } from "@/modules/media/files/interfaces";
import { rules } from "../validation/frequencyFormValidationRules";
import { useFrequency } from "../composables/UseFrequencyStore";

/* ------------------------------ Props & Refs ------------------------------ */

const useFrequencyStoreInstance = useFrequency();

/* -------------------------------- Functions ------------------------------- */

const handleSaved = async () => {
  emit("saved", []);
};

/* --------------------------------- Emmits --------------------------------- */

const emit = defineEmits<{
  saved: [medias: Media[]];
}>();
</script>

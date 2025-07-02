<template>
  <GenericForm
    formTitle="Physical Condition Form"
    formId="physical_condition_saving_form"
    :composable="usePhysicalConditionStoreInstance"
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
            placeholder="Enter physical condition name"
            tooltip="Specify a physical condition name"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericTextInput
            v-model="model.attributes.description"
            name="attributes.description"
            label="Description"
            placeholder="Enter physical condition description"
            tooltip="Specify a physical condition description"
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
import { rules } from "../validation/physicalConditionFormValidationRules";
import { usePhysicalCondition } from "../composables/UsePhysicalConditionStore";

/* ------------------------------ Props & Refs ------------------------------ */

const usePhysicalConditionStoreInstance = usePhysicalCondition();

/* -------------------------------- Functions ------------------------------- */

const handleSaved = async () => {
  emit("saved", []);
};

/* --------------------------------- Emmits --------------------------------- */

const emit = defineEmits<{
  saved: [medias: Media[]];
}>();
</script>

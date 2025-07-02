<template>
  <GenericForm
    formTitle="Category Form"
    formId="category_saving_form"
    :composable="useCategoryStoreInstance"
    :validationRules="categoryRules"
    @saved="handleSaved"
  >
    <template #default="{ model }">
      <el-row :gutter="20">
        <el-col :span="12">
          <GenericTextInput
            v-model="model.attributes.name"
            name="attributes.name"
            label="Name"
            placeholder="Enter category name"
            tooltip="Specify a category name"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericTextInput
            v-model="model.attributes.description"
            name="attributes.description"
            label="Description"
            placeholder="Enter category description"
            tooltip="Specify a category description"
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
import { rules as categoryRules } from "@/modules/catalogs/categories/validation/categoryFormValidationRules";
import { useCategory } from "../composables/UseCategoryStore";

/* ------------------------------ Props & Refs ------------------------------ */

const useCategoryStoreInstance = useCategory();

/* -------------------------------- Functions ------------------------------- */

const handleSaved = async () => {
  emit("saved", []);
};

/* --------------------------------- Emmits --------------------------------- */

const emit = defineEmits<{
  saved: [medias: Media[]];
}>();
</script>

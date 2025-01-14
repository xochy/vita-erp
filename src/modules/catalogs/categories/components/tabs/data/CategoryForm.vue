<template>
  <el-form
    v-loading="isLoading"
    id="category_saving_form"
    ref="categorySavingFormRef"
    class="form"
    :model="category"
    :rules="rules"
    @submit.prevent="submit()"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <Form.NameInput v-model="category.attributes.name" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <Form.DescriptionInput v-model="category.attributes.description" />
      </el-col>
    </el-row>

    <el-row class="mb-4" :gutter="20">
      <el-col :span="12" :offset="0">
        <el-button type="primary" @click="submit" :icon="Edit" :loading="isLoading">
          <span v-if="isLoading">Please wait...</span>
          <span v-else>Save</span>
        </el-button>
        <el-button type="info" @click="hancleClear">Clear</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import useCategory from "@/modules/catalogs/categories/composables/UseCategoryStore";
import { Edit } from "@element-plus/icons-vue";
import { rules } from "@/modules/catalogs/categories/validation/categoryFormValidationRules";
import { ref } from "vue";

import * as Form from "./fields";

/* ------------------------------ Props & Refs ------------------------------ */

const categorySavingFormRef = ref<null | HTMLFormElement>(null);
const { category, isLoading, createCategory, updateCategory } = useCategory();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Submit the form data and save the category.
 * @returns {void}
 */
const submit = () => {
  if (!categorySavingFormRef.value) return;

  categorySavingFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (category.value.id) {
      await updateCategory(category.value);
    } else {
      await createCategory(category.value);
    }

    emit("saved");
  });
};

/**
 * @description Clear the form data.
 * @returns {void}
 */
const hancleClear = () => {
  category.value = {
    attributes: {
      name: "",
      description: "",
    },
  };
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["saved"]);
</script>

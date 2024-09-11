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
        <el-button type="primary" @click="submit" :loading="isLoading">
          <span v-if="isLoading">Please wait...</span>
          <span v-else>Save</span>
        </el-button>
        <el-button type="primary">Clear</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import useCategory from "@/modules/catalogs/categories/composables/UseCategoryStore";
import { rules } from "@/modules/catalogs/categories/validation/categoryFormValidationRules";
import { ref } from "vue";

import * as Form from "./fields";

/* ---------------------------------- Props --------------------------------- */

const categorySavingFormRef = ref<null | HTMLFormElement>(null);
const { category, isLoading, createCategory, updateCategory } = useCategory();

/* -------------------------------- Functions ------------------------------- */

const submit = () => {
  if (!categorySavingFormRef.value) return;

  categorySavingFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (category.value.id) {
      updateCategory(category.value);
    } else {
      createCategory(category.value);
    }

    emit("saved");
  });
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["saved"]);
</script>

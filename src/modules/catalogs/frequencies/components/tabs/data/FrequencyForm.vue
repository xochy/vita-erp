<template>
  <BasicCard title="Frequency Form">
    <el-form
      v-loading="isLoading"
      id="frequency_saving_form"
      ref="frequencySavingFormRef"
      class="form"
      :model="frequency"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <!-- #region::Name -->
      <el-row :gutter="20">
        <el-col :span="12">
          <Form.NameInput v-model="frequency.attributes.name" />
        </el-col>
      </el-row>
      <!-- #endregion::Name -->

      <!-- #region::Description -->
      <el-row :gutter="20">
        <el-col :span="24">
          <Form.DescriptionInput v-model="frequency.attributes.description" />
        </el-col>
      </el-row>
      <!-- #endregion::Description -->

      <!-- #region::Actions buttons -->
      <el-row class="mb-4" :gutter="20">
        <el-col :span="12" :offset="0">
          <el-button type="primary" @click="submit" :icon="Edit" :loading="isLoading">
            <span v-if="isLoading">Please wait...</span>
            <span v-else>Save</span>
          </el-button>
          <el-button type="info" @click="hancleClear">Clear</el-button>
        </el-col>
      </el-row>
      <!-- #endregion::Actions buttons -->
    </el-form>
  </BasicCard>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import useFrequency from "../../../composables/UseFrequencyStore";
import { Edit } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { rules } from "../../../validation/frequencyFormValidationRules";

import * as Form from "./fields";

/* ------------------------------ Props & Refs ------------------------------ */

const frequencySavingFormRef = ref<null | HTMLFormElement>(null);
const { frequency, isLoading, createFrequency, updateFrequency } = useFrequency();

// watch isLoading
watch(isLoading, (value) => {
  console.log("isLoading", value);

});

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Submit the form data and save the frequency.
 * @returns {void}
 */
const submit = () => {
  if (!frequencySavingFormRef.value) return;

  frequencySavingFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (frequency.value.id) {
      await updateFrequency(frequency.value);
    } else {
      await createFrequency(frequency.value);
    }

    emit("saved");
  });
};

/**
 * @description Clear the form data.
 * @returns {void}
 */
const hancleClear = () => {
  frequency.value = {
    attributes: {
      name: "",
      description: "",
    },
  };
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["saved"]);
</script>

<template>
  <BasicCard title="Physical Condition Form">
    <el-form
      v-loading="isLoading"
      id="physical_condition_saving_form"
      ref="physicalConditionSavingFormRef"
      class="form"
      :model="physicalCondition"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <!-- #region::Name -->
      <el-row :gutter="20">
        <el-col :span="12">
          <Form.NameInput v-model="physicalCondition.attributes.name" />
        </el-col>
      </el-row>
      <!-- #endregion::Name -->

      <!-- #region::Description -->
      <el-row :gutter="20">
        <el-col :span="24">
          <Form.DescriptionInput v-model="physicalCondition.attributes.description" />
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
import usePhysicalcondition from "../../../composables/UsePhysicalConditionStore";
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import { rules } from "../../../validation/physicalConditionFormValidationRules";

import * as Form from "./fields";

/* ------------------------------ Props & Refs ------------------------------ */

const physicalConditionSavingFormRef = ref<null | HTMLFormElement>(null);
const {
  physicalCondition,
  isLoading,
  createPhysicalCondition,
  updatePhysicalCondition,
} = usePhysicalcondition();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Submit the form data and save the physical condition.
 * @returns {void}
 */
const submit = () => {
  if (!physicalConditionSavingFormRef.value) return;

  physicalConditionSavingFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (physicalCondition.value.id) {
      await updatePhysicalCondition(physicalCondition.value);
    } else {
      await createPhysicalCondition(physicalCondition.value);
    }

    emit("saved");
  });
};

/**
 * @description Clear the form data.
 * @returns {void}
 */
const hancleClear = () => {
  physicalCondition.value = {
    attributes: {
      name: "",
      description: "",
    },
  };
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["saved"]);
</script>

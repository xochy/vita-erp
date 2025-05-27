<template>
  <BasicCard title="Plan Form">
    <el-form
      v-loading="isLoading"
      id="plan_saving_form"
      ref="planSavingFormRef"
      class="form"
      :model="plan"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <!-- #region::Name -->
      <el-row :gutter="20">
        <el-col :span="12">
          <Form.NameInput v-model="plan.attributes.name" />
        </el-col>
      </el-row>
      <!-- #endregion::Name -->
    </el-form>
  </BasicCard>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import usePlan from "@/modules/plans/composables/UsePlanStore";
import { ref } from "vue";
import { rules } from "../../../validation/planFormValidationRules";

import * as Form from "./fields";

/* ------------------------------ Props & Refs ------------------------------ */

const planSavingFormRef = ref<null | HTMLFormElement>(null);
const { plan, isLoading, createPlan, updatePlan } = usePlan();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Submit the form data and save the plan.
 * @returns {void}
 */
const submit = () => {
  if (!planSavingFormRef.value) return;

  planSavingFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (plan.value.id) {
      await updatePlan(plan.value);
    } else {
      await createPlan(plan.value);
    }

    emit("saved");
  });
};

/**
 * @description Clear the form data.
 * @returns {void}
 */
const handleClear = () => {
  plan.value = {
    attributes: {
      name: "",
    },
  };
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["saved"]);
</script>

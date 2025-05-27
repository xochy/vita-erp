<template>
  <BasicCard title="Goal Form">
    <el-form
      v-loading="isLoading"
      id="goal_saving_form"
      ref="goalSavingFormRef"
      class="form"
      :model="goal"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <!-- #region::Name -->
      <el-row :gutter="20">
        <el-col :span="12">
          <Form.NameInput v-model="goal.attributes.name" />
        </el-col>
      </el-row>
      <!-- #endregion::Name -->

      <!-- #region::Description -->
      <el-row :gutter="20">
        <el-col :span="24">
          <Form.DescriptionInput v-model="goal.attributes.description" />
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
import useGoal from "../../../composables/UseGoalStore";
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import { rules } from "../../../validation/goalFormValidationRules";

import * as Form from "./fields";

/* ------------------------------ Props & Refs ------------------------------ */

const goalSavingFormRef = ref<null | HTMLFormElement>(null);
const { goal, isLoading, createGoal, updateGoal } = useGoal();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Submit the form data and save the goal.
 * @returns {void}
 */
const submit = () => {
  if (!goalSavingFormRef.value) return;

  goalSavingFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (goal.value.id) {
      await updateGoal(goal.value);
    } else {
      await createGoal(goal.value);
    }

    emit("saved");
  });
};

/**
 * @description Clear the form data.
 * @returns {void}
 */
const hancleClear = () => {
  goal.value = {
    attributes: {
      name: "",
      description: "",
    },
  };
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["saved"]);
</script>

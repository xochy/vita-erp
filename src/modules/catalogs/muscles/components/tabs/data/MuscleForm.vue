<template>
  <BasicCard title="Muscle Form">
    <el-form
      v-loading="isLoading"
      id="muscle_saving_form"
      ref="muscleSavingFormRef"
      class="form"
      :model="muscle"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <!-- #region::Name -->
      <el-row :gutter="20">
        <el-col :span="12">
          <Form.NameInput v-model="muscle.attributes.name" />
        </el-col>
      </el-row>
      <!-- #endregion::Name -->

      <!-- #region::Description -->
      <el-row :gutter="20">
        <el-col :span="24">
          <Form.DescriptionInput v-model="muscle.attributes.description" />
        </el-col>
      </el-row>
      <!-- #endregion::Description -->

      <!-- #region::Images -->
      <el-row :gutter="20">
        <el-col :span="24">
          <Form.ImagesUploader v-model="images" />
        </el-col>
      </el-row>
      <!-- #endregion::Images -->

      <!-- #region::Actions buttons -->
      <el-row class="mb-4" :gutter="20">
        <el-col :span="12" :offset="0">
          <el-button type="primary" @click="submit" :icon="Edit" :loading="isLoading">
            <span v-if="isLoading">Please wait...</span>
            <span v-else>Save</span>
          </el-button>
          <el-button type="primary" @click="hancleClear">Clear</el-button>
        </el-col>
      </el-row>
      <!-- #endregion::Actions buttons -->
    </el-form>
  </BasicCard>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import type { Media } from "@/modules/media/files/interfaces";
import type { UploadUserFile } from "element-plus";
import useMuscle from "@/modules/catalogs/muscles/composables/UseMuscleStore";
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import { rules } from "@/modules/catalogs/muscles/validation/muscleFormValidationRules";

import * as Form from "./fields";

/* ------------------------------ Props & Refs ------------------------------ */

const props = defineProps<{ files: UploadUserFile[] }>();

const images = ref<UploadUserFile[]>(props.files);
const muscleSavingFormRef = ref<null | HTMLFormElement>(null);

const { muscle, isLoading, createMuscle, updateMuscle, saveMuscleFiles } = useMuscle();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Submit the form data and save the muscle.
 * @returns {void}
 */
const submit = () => {
  if (!muscleSavingFormRef.value) return;

  muscleSavingFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (muscle.value.id) {
      updateMuscle(muscle.value, {
        onSuccess: async ({ data }) => {
          saveImages(data.id);
        },
      });
    } else {
      createMuscle(muscle.value, {
        onSuccess: async ({ data }) => {
          saveImages(data.id);
        },
      });
    }
  });
};

/**
 * @description Save the images of the muscle.
 * @param {string} muscleId
 * @returns {void}
 */
const saveImages = async (muscleId: string) => {
  if (!images.value.length) {
    emit("saved", []);
    return;
  }

  await saveMuscleFiles(
    { muscleId, files: images.value },
    {
      onSuccess: ({ data }) => {
        emit("saved", data);
      },
    }
  );
};

/**
 * @description Clear de form data and the images array
 * @returns {void}
 */
const hancleClear = () => {
  muscle.value = {
    attributes: {
      name: "",
      description: "",
    },
  };

  images.value = [];
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits<{
  saved: [medias: Media[]];
}>();
</script>

<style scoped>
.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <el-dialog v-model="dialogVisible" title="Translation" width="700">
    <template v-if="isLoading">
      <BasicSkeleton :height="100" />
    </template>

    <el-form
      v-else
      id="category_saving_form"
      ref="translationSavingFormRef"
      class="form"
      :model="translation"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <Form.TranslationInput
            v-model="translation.attributes.translation"
            :field="translation.attributes.column"
            :type="'textarea'"
          />
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import * as Form from "./fields";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import useTranslation from "@/modules/shared/translations/composables/UseTranslationStore";
import { ref } from "vue";
import { rules } from "@/modules/shared/translations/validation/translationFormValidationRules";

/* ---------------------------------- Props --------------------------------- */

const dialogVisible = ref(false);
const translationSavingFormRef = ref<null | HTMLFormElement>(null);
const { actions, isLoading, translation } = useTranslation();

/* -------------------------------- Functions ------------------------------- */

const loadTranslation = (translationId: string) => {
  actions.getTranslation(translationId);
};

const submit = () => {
  if (!translationSavingFormRef.value) return;

  translationSavingFormRef.value.validate(async (valid: any) => {
    if (!valid) return;

    if (translation.value?.id) {
      await actions.updateTranslation(translation.value);
    } else {
      await actions.createTranslation(translation.value);
    }

    dialogVisible.value = false;
    emit("saved");
  });
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["saved"]);

/* --------------------------------- Expose --------------------------------- */

defineExpose({
  dialogVisible,
  loadTranslation,
});
</script>

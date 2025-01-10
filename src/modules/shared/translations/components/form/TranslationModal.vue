<template>
  <el-dialog
    v-model="dialogVisible"
    title="Translation"
    width="700"
    :before-close="onCloseModal"
  >
    <template v-if="isFetching">
      <BasicSkeleton :height="100" />
    </template>

    <el-form
      v-else
      v-loading="isLoading"
      id="category_saving_form"
      ref="translationSavingFormRef"
      class="form"
      :model="translation"
      :rules="rules"
      @submit.prevent="submit()"
    >
      <el-row :gutter="20" class="mb-3">
        <!-- #region::Field selector -->
        <el-col :span="18">
          <el-select v-model="translation.attributes.column" placeholder="Select field">
            <el-option
              v-for="item in fields"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="isAvailableField(item.value)"
            />
          </el-select>
        </el-col>
        <!-- #endregion::Field selector -->

        <!-- #region::Locale selector -->
        <el-col :span="6">
          <el-select v-model="translation.attributes.locale" placeholder="Select locale">
            <el-option
              v-for="locale in locales"
              :key="locale.value"
              :label="locale.label"
              :value="locale.value"
            />
          </el-select>
        </el-col>
        <!-- #endregion::Locale selector -->
      </el-row>

      <el-row :gutter="20">

      <!-- #region:: -->
        <el-col v-if="translation.attributes.column" :span="24">
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
        <el-button @click="onCloseModal">Cancel</el-button>
        <el-button
          v-if="translation.attributes.column"
          type="primary"
          @click="submit"
          :icon="Edit"
          :loading="isLoading"
          ><span v-if="isLoading">Please wait...</span>
          <span v-else>Save</span></el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import * as Form from "./fields";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import type {
  Translation,
  TranslationableField,
} from "@/modules/shared/translations/interfaces";
import useTranslation from "@/modules/shared/translations/composables/UseTranslationStore";
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import { rules } from "@/modules/shared/translations/validation/translationFormValidationRules";

/* ------------------------------ Props & Refs ------------------------------ */

const props = defineProps<{
  modelId: string;
  modelType: string;
  translationsColumns: string[];
  fields: TranslationableField[];
}>();

const dialogVisible = ref(false);
const translationSavingFormRef = ref<null | HTMLFormElement>(null);
const {
  actions,
  locales,
  isLoading,
  translation,
  clearTranslation,
  status: { isFetching, isDeleting },
} = useTranslation();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load translation by id from the API
 * @param {string} translationId
 * @returns {void}
 */
const loadTranslation = (translationId: string | null): void => {
  if (translationId) {
    return actions.getTranslation(translationId);
  }

  translation.value.relationships!.translationable.data.id = props.modelId;
  translation.value.relationships!.translationable.data.type = props.modelType;
};

/**
 * @description Submit the form to create or update a translation
 * @returns {void}
 */
const submit = (): void => {
  if (!translationSavingFormRef.value) return;

  translationSavingFormRef.value.validate(async (valid: any) => {
    if (!valid) return;

    if (translation.value?.id) {
      await actions.updateTranslation(translation.value);
      emit("updated", translation.value);
    } else {
      await actions.createTranslation(translation.value);
      emit("created", translation.value);
    }

    dialogVisible.value = false;
    clearTranslation();
  });
};

/**
 * @description Close the modal and clear the translation
 * @returns {void}
 */
const onCloseModal = (): void => {
  dialogVisible.value = false;
  clearTranslation();
};

/**
 * @description Check if the field is available to be selected
 * @param {string} field
 * @returns {boolean}
 */
const isAvailableField = (field: string): boolean => {
  return props.translationsColumns.some((item) => item === field);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits<{
  created: [translation: Translation];
  updated: [translation: Translation];
}>();

/* --------------------------------- Expose --------------------------------- */

defineExpose({
  actions,
  isDeleting,
  dialogVisible,
  loadTranslation,
});
</script>

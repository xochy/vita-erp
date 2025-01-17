<template>
  <BasicSkeleton v-if="isPending" />

  <template v-else>
    <el-result
      v-if="isError"
      icon="error"
      title="Error"
      sub-title="An error occurred while fetching translations."
    />

    <el-empty
      v-else-if="!areThereTranslations"
      description="No translations created."
      :image-size="100"
    />

    <BasicCard v-else>
      <el-collapse v-loading="translationModal?.isDeleting">
        <el-collapse-item v-for="translation in translations" :key="translation.id">
          <template #title>
            <el-badge
              :value="translation.attributes.locale"
              type="primary"
              :offset="[13, 5]"
            >
              <h4>Field {{ translation.attributes.column }}</h4>
            </el-badge>
          </template>
          <el-row :gutter="20">
            <el-col :span="can.modify ? 21 : 24">
              {{ translation.attributes.translation }}
            </el-col>
            <el-col v-if="can.modify" :span="3" class="button-col">
              <el-tooltip content="Edit">
                <el-button
                  type="primary"
                  :icon="Edit"
                  @click="openModal(translation.id)"
                />
              </el-tooltip>
              <el-tooltip content="Delete">
                <el-button
                  type="danger"
                  :icon="Delete"
                  @click="deleteTranslation(translation.id)"
                />
              </el-tooltip>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <el-row v-if="canAddTranslation" class="mt-4" :gutter="20">
        <el-col :span="12" :offset="0">
          <el-button
            type="primary"
            @click="openModal(null)"
            :icon="Plus"
            :disabled="translationModal?.isDeleting"
          >
            Add translation
          </el-button>
        </el-col>
      </el-row>
    </BasicCard>

    <TranslationModal
      ref="translationModal"
      :fields="fields"
      :model-id="modelId"
      :model-type="modelType"
      :translations-columns="translationsColumns"
      @created="translationCreated"
      @updated="translationUpdated"
    />
  </template>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import TranslationModal from "@/modules/shared/translations/components/form/TranslationModal.vue";
import type {
  Translation,
  TranslationableField,
} from "@/modules/shared/translations/interfaces";
import { useTranslationsMutation } from "@/modules/shared/translations/composables/UseTranslationsStore";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { computed, onMounted, ref } from "vue";
import { fields } from "@/modules/catalogs/categories/components/tabs/data/fields";
import { ElMessage, ElMessageBox } from "element-plus";

/* ------------------------------ Props & Refs ------------------------------ */

const FIELDS_SET = "column,locale,translation";

const props = defineProps<{
  modelId: string;
  modelType: string;
  translationsLink: string;
  fields: TranslationableField[];
}>();

const { can, fetch, isPending, isError, translations } = useTranslationsMutation(
  props.translationsLink,
  FIELDS_SET
);

const translationModal = ref<InstanceType<typeof TranslationModal> | null>(null);

/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  fetch();
});

/* -------------------------------- Computed ------------------------------- */

/**
 * @description Check if a new translation can be added based on the number
 * of translations already added
 * @returns {boolean}
 */
const canAddTranslation = computed(() => {
  return translations.value.length < fields.length;
});

const areThereTranslations = computed(() => translations.value.length > 0);

const translationsColumns = computed(() =>
  translations.value.map(
    (item: { attributes: { column: any } }) => item.attributes.column
  )
);

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Open the translation modal to edit a translation
 * @param {string} translationId
 * @returns {void}
 */
const openModal = (translationId: string | null): void => {
  if (translationModal.value) {
    translationModal.value.dialogVisible = true;
    translationModal.value.loadTranslation(translationId);
  }
};

/**
 * @description Add a new translation to the translations list
 * @param {Translation} translation
 * @returns {void}
 */
const translationCreated = (translation: Translation): void => {
  translations.value = [...translations.value, translation];
};

/**
 * @description Refresh the translation in the translations list
 * @param {Translation} translation
 * @returns {void}
 */
const translationUpdated = (translation: Translation): void => {
  translations.value = translations.value.map((item: { id: string }) =>
    item.id === translation.id ? translation : item
  );
};

/**
 * @description Delete a translation from the translations list
 * @param {string} translationId
 * @returns {void}
 */
const deleteTranslation = (translationId: string): void => {
  ElMessageBox.confirm("Are you sure to delete the translation?", "Deleting", {
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      translationModal.value?.actions.removeTranslation(translationId, {
        onSuccess: () => {
          translations.value = translations.value.filter(
            (item: { id: string }) => item.id !== translationId
          );
        },
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Deleting canceled",
      });
    });
};
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>

<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching categories."
  />

  <BasicSkeleton v-else-if="isLoading" />

  <el-collapse v-else>
    <el-collapse-item v-for="translation in translations" :key="translation.id">
      <template #title>
        <el-badge :value="translation.attributes.locale" type="primary" :offset="[13, 5]">
          <h4>Field {{ translation.attributes.column }}</h4>
        </el-badge>
      </template>
      <el-row :gutter="20">
        <el-col :span="21">{{ translation.attributes.translation }}</el-col>
        <el-col :span="3" class="button-col">
          <el-button type="primary" :icon="Edit" @click="openModal(translation.id)" />
          <el-button type="primary" :icon="Delete" />
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>

  <TranslationModal ref="translationModal" />
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import TranslationModal from "@/modules/shared/translations/components/form/TranslationModal.vue";
import useCategory from "@/modules/catalogs/categories/composables/UseCategoryStore";
import useTranslations from "@/modules/shared/translations/composables/UseTranslationsStore";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";

/* ---------------------------------- Props --------------------------------- */

const FIELDS_SET = "column,locale,translation";

const { category } = useCategory();
const { translations, isLoading, isError } = useTranslations(
  category.value.relationships?.translations.links.related,
  FIELDS_SET,
  true
);

const translationModal = ref<InstanceType<typeof TranslationModal> | null>(null);

/* -------------------------------- Functions ------------------------------- */

const openModal = (id: string) => {
  if (translationModal.value) {
    translationModal.value.dialogVisible = true;
    translationModal.value.loadTranslation(id);
  }
};
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>

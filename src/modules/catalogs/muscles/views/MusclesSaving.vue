<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for muscle form -->
    <el-tab-pane v-if="can.save" label="Data" name="muscleData">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <MuscleForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for muscle form -->

    <!-- #region::Tab for muscle translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="muscle.relationships?.translations"
        :fields="fields"
        :model-type="'muscles'"
        :model-id="muscle.id"
        :translations-link="muscle.relationships?.translations.links.related"
      />
      <el-empty v-else description="No muscle created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for muscle translations -->

    <!-- #region::Tab for muscle details -->
    <el-tab-pane label="Details" name="details">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <MuscleDetails
        v-else-if="muscle.id"
        :muscle="muscle"
        :images="images"
        :isLoading="isFetching"
      />
      <el-empty v-else description="No muscle created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for muscle details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import MuscleDetails from "../components/tabs/details/MuscleDetails.vue";
import MuscleForm from "../components/tabs/data/MuscleForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import useMuscle from "../composables/UseMuscleStore";
import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import { useModelLoader } from "@/modules/shared/generic/composables/useModelLoader";

/* ------------------------------ Props & Refs ------------------------------ */

const fields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

const {
  can,
  muscle,
  getMuscle,
  clearMuscle,
  status: { isFetching },
} = useMuscle();

const {
  activeName,
  files,
  images,
  isLoadingMediasOrConverting,
  handleSaved,
} = useModelLoader({
  modelType: "muscles",
  fetchModel: getMuscle,
  clearModel: clearMuscle,
  defaultTab: "muscleData",
  hasMedias: true,
  mediaCollection: "muscles-images",
});
</script>

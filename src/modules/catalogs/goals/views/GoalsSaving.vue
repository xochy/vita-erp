<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for goal form -->
    <el-tab-pane v-if="can.save" label="Data" name="goalData">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <GoalForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for goal form -->

    <!-- #region::Tab for goal translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="item.relationships?.translations"
        :fields="translationableFields"
        :model-type="'goals'"
        :model-id="item.id"
        :translations-link="item.relationships?.translations.links.related"
      />
      <el-empty v-else description="No goal translations created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for goal translations -->

    <!-- #region::Tab for goal details -->
    <el-tab-pane label="Details" name="details">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <GoalDetails
        v-else-if="item.id"
        :goal="item"
        :is-loading="isFetching"
      />
      <el-empty v-else description="No goal created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for goal details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import GoalDetails from "../components/GoalDetails.vue";
import GoalForm from "../components/GoalForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import { useGoal, translationableFields } from "../composables/UseGoalStore";
import { useModelLoader } from "@/modules/shared/generic/composables/useModelLoader";

/* ------------------------------ Props & Refs ------------------------------ */

const {
  can,
  item,
  fetch,
  clearItem,
  status: { isFetching },
} = useGoal();

const {
  activeName,
  files,
  isLoadingMediasOrConverting,
  handleSaved,
} = useModelLoader({
  modelType: "goals",
  fetchModel: fetch,
  clearModel: clearItem,
  defaultTab: "goalData",
  hasMedias: false,
});
</script>

<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for workout form -->
    <el-tab-pane v-if="can.save" label="Data" name="workoutData">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <WorkoutForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for workout form -->

    <!-- #region::Tab for workout translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="item.relationships?.translations"
        :fields="translationableFields"
        :model-type="'workouts'"
        :model-id="item.id"
        :translations-link="item.relationships?.translations.links.related"
      />
      <el-empty v-else description="No workout translations created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for workout translations -->

    <!-- #region::Tab for workout details -->
    <el-tab-pane label="Details" name="details">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <WorkoutDetails
        v-else-if="item.id"
        :workout="item"
        :is-loading="isFetching"
      />
      <el-empty v-else description="No workout created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for workout details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import WorkoutDetails from "../components/WorkoutDetails.vue";
import WorkoutForm from "../components/WorkoutForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import { useWorkout, translationableFields } from "../composables/UseWorkoutStore";
import { useModelLoader } from "@/modules/shared/generic/composables/useModelLoader";

/* ------------------------------ Props & Refs ------------------------------ */

const {
  can,
  item,
  fetch,
  clearItem,
  status: { isFetching },
} = useWorkout();

const {
  activeName,
  files,
  isLoadingMediasOrConverting,
  handleSaved,
} = useModelLoader({
  modelType: "workouts",
  fetchModel: fetch,
  clearModel: clearItem,
  defaultTab: "workoutData",
  hasMedias: false,
});
</script>

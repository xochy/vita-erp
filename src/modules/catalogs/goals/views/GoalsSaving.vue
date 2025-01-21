<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for goal form -->
    <el-tab-pane v-if="can.save" label="Data" name="goalData">
      <GoalForm @saved="activeName = 'details'" />
    </el-tab-pane>
    <!-- #endregion::Tab for goal form -->

    <!-- #region::Tab for goal translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="goal.relationships?.translations"
        :fields="fields"
        :model-type="'categories'"
        :model-id="goal.id"
        :translations-link="goal.relationships?.translations.links.related"
      />
      <el-empty v-else description="No goal created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for goal translations -->

    <!-- #region::Tab for goal details -->
    <el-tab-pane label="Details" name="details">
      <GoalDetails v-if="goal.id" :goal="goal" :is-loading="isFetching" />
      <el-empty v-else description="No goal created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for goal details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import GoalDetails from "../components/tabs/details/GoalDetails.vue";
import GoalForm from "../components/tabs/data/GoalForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import useGoal from "../composables/UseGoalStore";
import { fields } from "../components/tabs/data/fields";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

const activeName = ref("goalData");

const {
  can,
  goal,
  getGoal,
  clearGoal,
  status: { isFetching },
} = useGoal();

const route = useRoute();

console.log(can.save);


/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  loadGoal();
});

onUnmounted(() => {
  clearGoal();
});

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the goal data and set the active tab based on the route.
 * @returns {void}
 */
const loadGoal = (): void => {
  const goalId = route.params.id;
  const activeTab = route.params.tab;

  if (goalId) {
    getGoal(goalId);
    activeName.value = Array.isArray(activeTab) ? activeTab[0] : activeTab;
  }
};
</script>

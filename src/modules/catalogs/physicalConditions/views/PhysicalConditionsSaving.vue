<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for physical condition form -->
    <el-tab-pane v-if="can.save" label="Data" name="physicalConditionData">
      <PhysicalConditionForm @saved="activeName = 'details'" />
    </el-tab-pane>
    <!-- #endregion::Tab for physical condition form -->

    <!-- #region::Tab for physical condition translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="physicalCondition.relationships?.translations"
        :fields="fields"
        :model-type="'categories'"
        :model-id="physicalCondition.id"
        :translations-link="physicalCondition.relationships?.translations.links.related"
      />
      <el-empty v-else description="No physical condition created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for physical condition translations -->

    <!-- #region::Tab for physical condition details -->
    <el-tab-pane label="Details" name="details">
      <PhysicalConditionDetails
        v-if="physicalCondition.id"
        :physical-condition="physicalCondition"
        :is-loading="isFetching"
      />
      <el-empty v-else description="No physical condition created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for physical condition details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import PhysicalConditionDetails from "../components/tabs/details/PhysicalConditionDetails.vue";
import PhysicalConditionForm from "../components/tabs/data/PhysicalConditionForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import usePhysicalCondition from "../composables/UsePhysicalConditionStore";
import { fields } from "../components/tabs/data/fields";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

const activeName = ref("physicalConditionData");

const {
  can,
  physicalCondition,
  getPhysicalCondition,
  clearPhysicalCondition,
  status: { isFetching },
} = usePhysicalCondition();

const route = useRoute();

/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  loadPhysicalCondition();
});

onUnmounted(() => {
  clearPhysicalCondition();
});

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the physical condition data.
 * @returns {void}
 */
const loadPhysicalCondition = (): void => {
  const physicalConditionId = route.params.id;
  const activeTab = route.params.tab;

  if (physicalConditionId) {
    getPhysicalCondition(physicalConditionId);
    activeName.value = Array.isArray(activeTab) ? activeTab[0] : activeTab;
  }
};
</script>

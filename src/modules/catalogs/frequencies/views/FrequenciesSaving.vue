<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for frequency form -->
    <el-tab-pane v-if="can.save" label="Data" name="frequencyData">
      <FrequencyForm @saved="activeName = 'details'" />
    </el-tab-pane>
    <!-- #endregion::Tab for frequency form -->

    <!-- #region::Tab for frequency translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="frequency.relationships?.translations"
        :fields="fields"
        :model-type="'categories'"
        :model-id="frequency.id"
        :translations-link="frequency.relationships?.translations.links.related"
      />
      <el-empty v-else description="No frequency created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for frequency translations -->

    <!-- #region::Tab for frequency details -->
    <el-tab-pane label="Details" name="details">
      <FrequencyDetails v-if="frequency.id" :frequency="frequency" :is-loading="isFetching" />
      <el-empty v-else description="No frequency created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for frequency details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import FrequencyDetails from "../components/tabs/details/FrequencyDetails.vue";
import FrequencyForm from "../components/tabs/data/FrequencyForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import useFrequency from "../composables/UseFrequencyStore";
import { fields } from "../components/tabs/data/fields";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

const activeName = ref("frequencyData");

const {
  can,
  frequency,
  getFrequency,
  clearFrequency,
  status: { isFetching },
} = useFrequency();

const route = useRoute();

/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  loadFrequency();
});

onUnmounted(() => {
  clearFrequency();
});

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the frequency data.
 * @returns {void}
 */
const loadFrequency = (): void => {
  const frequencyId = route.params.id;
  const activeTab = route.params.tab;

  if (frequencyId) {
    getFrequency(frequencyId);
    activeName.value = Array.isArray(activeTab) ? activeTab[0] : activeTab;
  }
};
</script>

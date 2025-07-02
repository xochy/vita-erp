<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for frequency form -->
    <el-tab-pane v-if="can.save" label="Data" name="frequencyData">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <FrequencyForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for frequency form -->

    <!-- #region::Tab for frequency translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="item.relationships?.translations"
        :fields="translationableFields"
        :model-type="'frequencies'"
        :model-id="item.id"
        :translations-link="item.relationships?.translations.links.related"
      />
      <el-empty v-else description="No frequency translations created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for frequency translations -->

    <!-- #region::Tab for frequency details -->
    <el-tab-pane label="Details" name="details">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <FrequencyDetails
        v-else-if="item.id"
        :frequency="item"
        :is-loading="isFetching"
      />
      <el-empty v-else description="No frequency created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for frequency details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import FrequencyDetails from "../components/FrequencyDetails.vue";
import FrequencyForm from "../components/FrequencyForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import { useFrequency, translationableFields } from "../composables/UseFrequencyStore";
import { useModelLoader } from "@/modules/shared/generic/composables/useModelLoader";

/* ------------------------------ Props & Refs ------------------------------ */

const {
  can,
  item,
  fetch,
  clearItem,
  status: { isFetching },
} = useFrequency();

const {
  activeName,
  files,
  isLoadingMediasOrConverting,
  handleSaved,
} = useModelLoader({
  modelType: "frequencies",
  fetchModel: fetch,
  clearModel: clearItem,
  defaultTab: "frequencyData",
  hasMedias: false,
});
</script>

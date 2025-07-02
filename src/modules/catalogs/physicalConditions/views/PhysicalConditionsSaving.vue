<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for physical condition form -->
    <el-tab-pane v-if="can.save" label="Data" name="physicalConditionData">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <PhysicalConditionForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for physical condition form -->

    <!-- #region::Tab for physical condition translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="item.relationships?.translations"
        :fields="translationableFields"
        :model-type="'physical-conditions'"
        :model-id="item.id"
        :translations-link="item.relationships?.translations.links.related"
      />
      <el-empty v-else description="No physical condition translations created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for physical condition translations -->

    <!-- #region::Tab for physical condition details -->
    <el-tab-pane label="Details" name="details">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <PhysicalConditionDetails
        v-else-if="item.id"
        :physical-condition="item"
        :is-loading="isFetching"
      />
      <el-empty v-else description="No physical condition created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for physical condition details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import PhysicalConditionDetails from "../components/PhysicalConditionDetails.vue";
import PhysicalConditionForm from "../components/PhysicalConditionForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import { usePhysicalCondition, translationableFields } from "../composables/UsePhysicalConditionStore";
import { useModelLoader } from "@/modules/shared/generic/composables/useModelLoader";

/* ------------------------------ Props & Refs ------------------------------ */

const {
  can,
  item,
  fetch,
  clearItem,
  status: { isFetching },
} = usePhysicalCondition();

const {
  activeName,
  files,
  isLoadingMediasOrConverting,
  handleSaved,
} = useModelLoader({
  modelType: "physical-conditions",
  fetchModel: fetch,
  clearModel: clearItem,
  defaultTab: "physicalConditionData",
  hasMedias: false,
});
</script>

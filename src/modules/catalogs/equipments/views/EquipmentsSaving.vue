<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for equipment form -->
    <el-tab-pane v-if="can.save" label="Data" name="equipmentData">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <EquipmentForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for equipment form -->

    <!-- #region::Tab for muscle translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="item.relationships?.translations"
        :fields="translationableFields"
        :model-type="'equipments'"
        :model-id="item.id"
        :translations-link="item.relationships?.translations.links.related"
      />
      <el-empty v-else description="No equipment created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for muscle translations -->

    <!-- #region::Tab for equipment details -->
    <el-tab-pane label="Details" name="details">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <EquipmentDetails
        v-else-if="item.id"
        :equipment="item"
        :images="images"
        :is-loading="isFetching"
      />
      <el-empty v-else description="No equipment created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for equipment details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import EquipmentDetails from "../components/details/EquipmentDetails.vue";
import EquipmentForm from "../components/data/EquipmentForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import { useEquipment, translationableFields } from "../composables/UseEquipmentStore";
import { useModelLoader } from "@/modules/shared/generic/composables/useModelLoader";

/* ------------------------------ Props & Refs ------------------------------ */

const {
  can,
  item,
  fetch,
  clearItem,
  status: { isFetching },
} = useEquipment();

const {
  activeName,
  files,
  images,
  isLoadingMediasOrConverting,
  handleSaved,
} = useModelLoader({
  modelType: "equipments",
  fetchModel: fetch,
  clearModel: clearItem,
  defaultTab: "equipmentData",
  hasMedias: true,
  mediaCollection: "equipments-images",
});
</script>

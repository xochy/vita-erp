<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for category form -->
    <el-tab-pane v-if="can.save" label="Data" name="categoryData">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <CategoryForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for category form -->

    <!-- #region::Tab for category translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="item.relationships?.translations"
        :fields="translationableFields"
        :model-type="'categories'"
        :model-id="item.id"
        :translations-link="item.relationships?.translations.links.related"
      />
      <el-empty v-else description="No category translations created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for category translations -->

    <!-- #region::Tab for category details -->
    <el-tab-pane label="Details" name="details">
      <BasicSkeleton v-if="isLoadingMediasOrConverting" />
      <CategoryDetails
        v-else-if="item.id"
        :category="item"
        :is-loading="isFetching"
      />
      <el-empty v-else description="No category created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for category details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import CategoryDetails from "../components/CategoryDetails.vue";
import CategoryForm from "../components/CategoryForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import { useCategory, translationableFields } from "../composables/UseCategoryStore";
import { useModelLoader } from "@/modules/shared/generic/composables/useModelLoader";

/* ------------------------------ Props & Refs ------------------------------ */

const {
  can,
  item,
  fetch,
  clearItem,
  status: { isFetching },
} = useCategory();

const {
  activeName,
  files,
  isLoadingMediasOrConverting,
  handleSaved,
} = useModelLoader({
  modelType: "categories",
  fetchModel: fetch,
  clearModel: clearItem,
  defaultTab: "categoryData",
  hasMedias: false,
});
</script>

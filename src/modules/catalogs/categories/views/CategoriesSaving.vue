<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <el-tab-pane label="Data" name="categoryData">
      <CategoryForm @saved="activeName = 'details'" />
    </el-tab-pane>
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="category.relationships?.translations"
        :fields="fields"
        :model-type="'categories'"
        :model-id="category.id"
        :translations-link="category.relationships?.translations.links.related"
      />
      <el-empty v-else description="No category created." :image-size="100" />
    </el-tab-pane>
    <el-tab-pane lazy label="Details" name="details">
      <CategoryDetails :category="category" :is-loading="isFetching" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import CategoryDetails from "@/modules/catalogs/categories/components/tabs/details/CategoryDetails.vue";
import CategoryForm from "@/modules/catalogs/categories/components/tabs/data/CategoryForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import useCategory from "@/modules/catalogs/categories/composables/UseCategoryStore";
import { fields } from "@/modules/catalogs/categories/components/tabs/data/fields";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

const activeName = ref("categoryData");
const { category, getCategory, clearCategory, isFetching } = useCategory();
const route = useRoute();

/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  loadCategory();
});

onUnmounted(() => {
  clearCategory();
});

/* -------------------------------- Functions ------------------------------- */

const loadCategory = () => {
  const categoryId = route.params.id;
  if (categoryId) {
    getCategory(categoryId);
    activeName.value = "details";
  }
};
</script>

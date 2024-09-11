<template>
  <el-tabs v-loading="isLoading" v-model="activeName">
    <el-tab-pane label="Data" name="categoryData">
      <CategoryForm @saved="activeName = 'details'" />
    </el-tab-pane>
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse v-if="category.relationships?.translations" />
    </el-tab-pane>
    <el-tab-pane lazy label="Details" name="details">
      <CategoryDetails />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import CategoryDetails from "@/modules/catalogs/categories/components/tabs/details/CategoryDetails.vue";
import CategoryForm from "@/modules/catalogs/categories/components/tabs/data/CategoryForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import useCategory from "@/modules/catalogs/categories/composables/UseCategoryStore";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const activeName = ref("categoryData");
const { category, isLoading, getCategory, clearCategory } = useCategory();
const route = useRoute();

/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  loadCategory();
});

onUnmounted(() => {
  clearCategory();
});

//watch isLoading
watch(isLoading, (value) => {
  console.log("isLoading", value);
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

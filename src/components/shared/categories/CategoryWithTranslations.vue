<template>
  <InfoItem :label="category.attributes.name">
    <p class="info-text">{{ category.attributes.description }}</p>
    <template #translations>
      <Transition name="el-fade-in-linear">
        <div v-if="isShowingTranslations">
          <br />
          <BasicSkeleton v-if="isPendingTranslations" />
          <TranslationsCollapse v-else :translations="getAllTranslationsComputed()" />
        </div>
      </Transition>
    </template>
  </InfoItem>

  <el-switch
    v-model="isShowingTranslations"
    class="mt-5"
    inline-prompt
    active-text="Hide translations"
    inactive-text="Show translations"
  />
</template>

<script setup lang="ts">
import BasicSkeleton from "../skeletons/BasicSkeleton.vue";
import InfoItem from "@/components/shared/cards/InfoItem.vue";
import TranslationsCollapse from "@/components/shared/translations/TranslationsCollapse.vue";
import type { Category } from "@/modules/catalogs/categories/interfaces";
import { useTranslations } from "@/modules/shared/translations/composables/UseTranslations";
import { useTranslationsQuery } from "@/modules/shared/translations/composables/UseTranslationsStore";
import { ref } from "vue";

/* ------------------------------ Refs & Props ------------------------------ */

const FIELDS_SET = "column,locale,translation";

const props = defineProps<{ category: Category }>();
const isShowingTranslations = ref(false);

/* -------------------------------- Functions ------------------------------- */

const {
  data: translationsData,
  isPending: isPendingTranslations,
  isError: isErrorTranslations,
} = useTranslationsQuery(
  props.category.relationships?.translations?.links.related!,
  FIELDS_SET,
  isShowingTranslations
);

const { getAllTranslationsComputed } = useTranslations(translationsData, "es");
</script>

<template>
  <div v-for="muscle in muscles" :key="muscle.id" class="mb-8">
    <InfoItem :label="muscle.attributes.name">
      <p class="info-text">{{ muscle.attributes.description }}</p>
      <template #translations>
        <Transition name="el-fade-in-linear">
          <div v-if="isShowingTranslations[muscle.id]">
            <br />
            <BasicSkeleton v-if="isPendingTranslations[muscle.id]" />
            <TranslationsCollapse
              v-else
              :translations="getAllTranslationsComputed[muscle.id]()"
            />
          </div>
        </Transition>
      </template>
    </InfoItem>

    <el-switch
      v-model="isShowingTranslations[muscle.id]"
      class="mt-5"
      inline-prompt
      active-text="Hide translations"
      inactive-text="Show translations"
    />
  </div>
</template>

<script setup lang="ts">
import BasicSkeleton from "../skeletons/BasicSkeleton.vue";
import InfoItem from "@/components/shared/cards/InfoItem.vue";
import TranslationsCollapse from "@/components/shared/translations/TranslationsCollapse.vue";
import type { Muscle } from "@/modules/catalogs/muscles/interfaces";
import { useTranslations } from "@/modules/shared/translations/composables/UseTranslations";
import { useTranslationsQuery } from "@/modules/shared/translations/composables/UseTranslationsStore";
import { reactive, computed } from "vue";

/* ------------------------------ Refs & Props ------------------------------ */

const FIELDS_SET = "column,locale,translation";

const props = defineProps<{ muscles: Muscle[] }>();

const isShowingTranslations = reactive<Record<string, boolean>>({});
const isPendingTranslations = reactive<Record<string, boolean>>({});
const getAllTranslationsComputed = reactive<Record<string, () => any>>({});

/* -------------------------------- Functions ------------------------------- */

props.muscles.forEach((muscle) => {
  isShowingTranslations[muscle.id] = false;

  const { data, isPending } = useTranslationsQuery(
    muscle.relationships?.translations?.links.related!,
    FIELDS_SET,
    computed(() => isShowingTranslations[muscle.id])
  );

  isPendingTranslations[muscle.id] = isPending;
  getAllTranslationsComputed[muscle.id] = () =>
    useTranslations(data, "es").getAllTranslationsComputed.value();
});
</script>

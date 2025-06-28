<template>
  <el-card
    class="exercise-card"
    shadow="hover"
    v-loading="isShowingTranslations && isPendingTranslations"
  >
    <!-- #region::Header content -->
    <template #header>
      <div class="exercise-header">
        <div class="exercise-header-inner">
          <h3 class="exercise-title">{{ workout.attributes.name }}</h3>
          <Transition name="el-fade-in-linear">
            <h4 v-if="isShowingTranslations">
              {{ getTranslationsTextByColumnComputed("name") }}
            </h4>
          </Transition>
        </div>

        <div class="exercise-header-inner" <div>
          <el-tag
            :type="getGroupTagType(workout.attributes.group)"
            size="small"
            class="group-tag"
          >
            {{ workout.attributes.group }}
          </el-tag>
          <el-switch
            v-model="isShowingTranslations"
            inline-prompt
            active-text="Hide translations"
            inactive-text="Show translations"
          />
        </div>
      </div>
    </template>
    <!-- #endregion::Header content -->

    <!-- #region::Workout content -->
    <div class="exercise-content">
      <!-- #region::Image section -->
      <div class="image-section">
        <el-image
          :src="workout.attributes.imageUrl"
          :alt="workout.attributes.name"
          class="exercise-image"
          fit="cover"
          :preview-src-list="[workout.attributes.imageUrl]"
          loading="lazy"
        >
          <template #placeholder>
            <div class="image-placeholder">
              <el-icon class="loading-icon">
                <Loading />
              </el-icon>
              <span>Cargando...</span>
            </div>
          </template>
          <template #error>
            <div class="image-error">
              <el-icon><Picture /></el-icon>
              <span>No image</span>
            </div>
          </template>
        </el-image>
      </div>
      <!-- #endregion::Image section -->

      <!-- #region::Info section -->
      <div class="info-section">
        <!-- #region::Levels section -->
        <InfoItem v-if="workout.attributes.levels" label="Levels" :icon="TrendCharts">
          <div class="levels-container">
            <el-tag
              v-for="level in parsedLevels"
              class="level-tag"
              size="small"
              :key="level"
              :type="getLevelTagType(level)"
            >
              {{ capitalizeFirst(level) }}
            </el-tag>
          </div>
        </InfoItem>
        <!-- #endregion::Levels section -->

        <!-- #region::Performance section -->
        <InfoItem
          v-if="workout.attributes.performance"
          label="Performance"
          :icon="VideoPlay"
        >
          <p class="info-text">{{ workout.attributes.performance }}</p>
          <template #translations>
            <Transition name="el-fade-in-linear">
              <div v-if="isShowingTranslations">
                <br />
                <TranslationsCollapse
                  :translations="getTranslationsByColumnComputed('performance')"
                />
              </div>
            </Transition>
          </template>
        </InfoItem>
        <!-- #endregion::Performance section -->

        <!-- #region::Comments section -->
        <InfoItem
          v-if="workout.attributes.comments"
          label="Comments"
          :icon="ChatDotRound"
        >
          <p class="info-text">{{ workout.attributes.comments }}</p>
          <template #translations>
            <Transition name="el-fade-in-linear">
              <div v-if="isShowingTranslations">
                <br />
                <TranslationsCollapse
                  :translations="getTranslationsByColumnComputed('comments')"
                />
              </div>
            </Transition>
          </template>
        </InfoItem>
        <!-- #endregion::Comments section -->

        <!-- #region::Corrections section -->
        <InfoItem v-if="workout.attributes.corrections" label="Corrections" :icon="Check">
          <p class="info-text">{{ workout.attributes.corrections }}</p>
          <template #translations>
            <Transition name="el-fade-in-linear">
              <div v-if="isShowingTranslations">
                <br />
                <TranslationsCollapse
                  :translations="getTranslationsByColumnComputed('corrections')"
                />
              </div>
            </Transition>
          </template>
        </InfoItem>
        <!-- #endregion::Corrections section -->

        <!-- #region::Warnings section -->
        <InfoItem
          v-if="workout.attributes.warnings"
          label="Warnings"
          item-class="warning-item"
          label-class="warning-label"
          :icon="Warning"
        >
          <el-alert
            class="warning-alert"
            type="warning"
            show-icon
            :title="workout.attributes.warnings"
            :closable="false"
          />
          <template #translations>
            <Transition name="el-fade-in-linear">
              <div v-if="isShowingTranslations">
                <br />
                <TranslationsCollapse
                  :translations="getTranslationsByColumnComputed('warnings')"
                />
              </div>
            </Transition>
          </template>
        </InfoItem>
        <!-- #endregion::Warnings section -->

        <!-- #region::Created section -->
        <InfoItem :icon="Calendar" label="Created">
          <span class="info-text">
            {{ dayjs(workout.attributes.createdAt).fromNow() }}
          </span>
        </InfoItem>
        <!-- #endregion::Created section -->
      </div>
      <!-- #endregion::Info section -->
    </div>
    <!-- #endregion::Workout content -->

    <!-- #region::Collapse section -->
    <WorkoutAdditionalInfo class="collapse-content" :workout="workout" />
    <!-- #endregion::Collapse section -->
  </el-card>
</template>

<script setup lang="ts">
import InfoItem from "@/components/shared/cards/InfoItem.vue";
import TranslationsCollapse from "@/components/shared/translations/TranslationsCollapse.vue";
import WorkoutAdditionalInfo from "./WorkoutAdditionalInfo.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Workout } from "../interfaces";
import { capitalizeFirst } from "@/helpers/stringUtils";
import { computed, ref } from "vue";
import { getGroupTagType, getLevelTagType } from "@/helpers/workoutUtils";

import {
  Check,
  Picture,
  Warning,
  Calendar,
  VideoPlay,
  TrendCharts,
  ChatDotRound,
} from "@element-plus/icons-vue";

import "dayjs/locale/es";
import { useTranslationsQuery } from "@/modules/shared/translations/composables/UseTranslationsStore";
import { useTranslations } from "@/modules/shared/translations/composables/UseTranslations";

dayjs.extend(relativeTime);
dayjs.locale("en");

/* ------------------------------ Refs & Props ------------------------------ */

const props = defineProps<{ workout: Workout }>();

const isShowingTranslations = ref(false);

const FIELDS_SET = "column,locale,translation";
const {
  data: translationsData,
  isPending: isPendingTranslations,
  isError: isErrorTranslations,
} = useTranslationsQuery(
  props.workout.relationships!.translations.links.related,
  FIELDS_SET,
  isShowingTranslations
);

const {
  getTranslationsByColumnComputed,
  getTranslationsTextByColumnComputed,
} = useTranslations(translationsData, "es");

/* -------------------------------- Computed -------------------------------- */

const parsedLevels = computed(() => {
  try {
    return JSON.parse(props.workout.attributes.levels);
  } catch {
    return [];
  }
});
</script>

<style lang="scss">
@import "@/assets/sass/modules/workouts/workout_list_card.scss";
</style>

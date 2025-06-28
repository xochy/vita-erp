<template>
  <div class="collapse-section">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="additional-info">
        <template #title>
          <div class="collapse-title">
            <el-icon><More /></el-icon>
            <span>Additional Information</span>
          </div>
        </template>

        <el-tabs
          v-if="isCollapseOpen"
          v-model="activeTab"
          lazy
        >
          <el-tab-pane label="Category" name="category">
            <WorkoutCategory
              :related-url="workout.relationships!.category.links.related"
            />
          </el-tab-pane>
          <el-tab-pane label="Muscles" name="muscles" lazy>
            <WorkoutMuscles
              :related-url="workout.relationships!.muscles.links.related"
            />
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { More } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import type { Workout } from "../interfaces";
import WorkoutCategory from "./relationships/WorkoutCategory.vue";
import WorkoutMuscles from "./relationships/WorkoutMuscles.vue";

/* ------------------------------ Refs & Props ------------------------------ */

defineProps<{ workout: Workout }>();

const activeName = ref<string>("");
const activeTab = ref("category");

const isCollapseOpen = computed(() => {
  return activeName.value === 'additional-info';
});
</script>

<style scoped>
@import "@/assets/sass/modules/workouts/workout_additional_info.scss";
</style>

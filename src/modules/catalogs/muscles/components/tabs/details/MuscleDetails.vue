<template>
  <BasicSkeleton v-if="isLoading" />

  <el-descriptions v-else border>
    <el-descriptions-item label="Name" :span="4">
      {{ muscle.attributes.name }}
    </el-descriptions-item>
    <el-descriptions-item label="Description" :span="2">
      {{ muscle.attributes.description }}
    </el-descriptions-item>
    <el-descriptions-item label="Images">
      <MusclesImagesCarousel :images="images" />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import MusclesImagesCarousel from "@/components/shared/carousels/MusclesImagesCarousel.vue";
import type { Muscle } from "@/modules/catalogs/muscles/interfaces";
import type { Media } from "@/modules/media/files/interfaces";

defineProps<{ muscle: Muscle; isLoading: boolean; images: Media[] }>();
</script>

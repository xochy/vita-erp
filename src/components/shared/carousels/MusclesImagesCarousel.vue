<template>
  <div class="square-carousel">
    <el-carousel
      direction="vertical"
      :autoplay="false"
      :height="carouselHeight"
    >
      <el-carousel-item v-for="image in images" :key="image.id">
        <div class="carousel-content">
          <el-image :src="image.attributes.publicUrl" fit="fill" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import type { Media } from "@/modules/media/files/interfaces";

defineProps<{ images: Media[] }>();

const carouselHeight = "180px";
</script>

<style scoped>
.square-carousel {
  width: 180px;
  margin: 0 auto;
}

.carousel-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <!-- #region::Heading -->
  <div class="mb-13 text-center">
    <!-- #region::Title -->
    <h1 class="mb-3">{{ title }}</h1>
    <!-- #endregion::Title -->

    <!-- #region::Description -->
    <div class="text-gray-500 fw-semibold fs-5">
      {{ description }}
    </div>
    <!-- #endregion::Description -->
  </div>
  <!-- #endregion::Heading -->
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
</script>

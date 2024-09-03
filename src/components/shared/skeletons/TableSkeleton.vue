<template>
  <BasicSkeleton :height="250" />
    <br />
    <BasicSkeleton :height="50" />
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
</script>
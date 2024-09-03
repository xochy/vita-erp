<template>
  <button
    :data-kt-indicator="isLoading ? 'on' : null"
    class="btn btn-lg btn-primary"
    type="submit"
  >
    <span v-if="!isLoading" class="indicator-label"> Submit </span>
    <span v-if="isLoading" class="indicator-progress">
      Please wait...
      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ isLoading: boolean }>();
</script>
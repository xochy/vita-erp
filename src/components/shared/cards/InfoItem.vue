<template>
  <div class="info-item" :class="itemClass">
    <span class="info-label" :class="labelClass">
      <!-- The el-icon component from Element Plus. -->
      <!-- Dynamic <component> to render the passed-in icon. -->
      <el-icon v-if="icon"><component :is="icon" /></el-icon>
      {{ label }}:
    </span>
    <div>
      <slot></slot>
      <!-- Translations slot -->
      <div class="translations">
        <slot name="translations"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  icon: {
    type: Object,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  itemClass: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
@import "@/assets/sass/modules/shared/Info_content.scss";
</style>

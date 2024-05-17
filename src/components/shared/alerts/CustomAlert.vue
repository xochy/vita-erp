<template>
  <!-- #region::Alert-->
  <div :class="[`alert alert-${$props.type} d-flex align-items-center p-5`]">
    <!-- #region::Icon-->
    <i :class="[`ki-duotone ki-${$props.icon} fs-2hx text-${$props.iconType} me-4`]"
      ><span class="path1"></span><span class="path2"></span
    ></i>
    <!-- #endregion::Icon-->

    <!-- #region::Wrapper-->
    <div class="d-flex flex-column">
      <!-- #region::Title-->
      <h4 :class="[`mb-1 text-${$props.titleColor}`]">{{ $props.title }}</h4>
      <!-- #endregion::Title-->

      <!-- #region::Content-->
      <span>{{ $props.content }}</span>
      <!-- #endregion::Content-->
    </div>
    <!-- #endregion::Wrapper-->
  </div>
  <!-- #endregion::Alert-->
</template>

<script setup lang="ts">
export interface Props {
  content   ?: string;
  icon       : string;
  iconType   : string;
  title      : string;
  titleColor : string;
  type       : string;
}

// Define $props with default values
withDefaults(defineProps<Props>(), {
  content   : "No content",
  icon      : "info-circle",
  iconType  : "primary",
  title     : "Info",
  titleColor: "primary",
  type      : "primary",
});
</script>

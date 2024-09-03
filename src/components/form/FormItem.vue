<template>
  <!-- #region::input group -->
  <div class="d-flex flex-column mb-8 fv-row">
    <!-- #region::label -->
    <label
      :for="name"
      class="d-flex align-items-center fs-6 fw-semibold mb-2"
    >
      <span class="required">{{ label }}</span>
      <i
        class="fas fa-exclamation-circle ms-2 fs-7"
        data-bs-toggle="tooltip"
        :title="tooltip"
      ></i>
    </label>
    <!-- #endregion::label -->

    <el-form-item :prop="name">
      <slot></slot>
    </el-form-item>
  </div>
  <!-- #endregion::input group -->
</template>

<script setup lang="ts">
interface Props {
  name: string;
  label: string;
  tooltip: string;
}

defineProps<Props>();
</script>

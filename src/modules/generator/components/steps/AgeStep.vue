<template>
  <div class="step-section">
    <div class="step-header">
      <el-icon class="step-icon"><Calendar /></el-icon>
      <h2>What's Your Age?</h2>
      <p>Age: {{ props.stepperData.age }} years old</p>
    </div>

    <div class="slider-container">
      <el-slider
        :model-value="props.stepperData.age"
        @update:model-value="handleChange"
        :min="13"
        :max="100"
        :step="1"
        show-stops
        show-tooltip
        class="age-slider"
      />
      <div class="slider-labels">
        <span>13</span>
        <span>100</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElSlider, ElIcon } from 'element-plus';
import { Calendar } from '@element-plus/icons-vue';

const props = defineProps<{
  stepperData: any;
}>();

const emit = defineEmits(['update']);

const handleChange = (value: number | number[]) => {
  const age = Array.isArray(value) ? value[0] : value;
  emit('update', { field: 'age', value: age });
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/generator/age-step.scss";
</style>

<template>
  <div class="step-section">
    <div class="step-header">
      <el-icon class="step-icon"><Trophy /></el-icon>
      <h2>What's Your Goal?</h2>
      <p>Choose your primary fitness objective</p>
    </div>

    <el-radio-group
      :model-value="props.stepperData.goal?.id || ''"
      @update:model-value="handleChange"
      class="radio-group"
    >
      <el-radio
        v-for="option in goalOptions"
        :key="option.id"
        :value="option.id"
        size="large"
        class="radio-option"
      >
        {{ option.name }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadio, ElIcon } from "element-plus";
import { Trophy } from "@element-plus/icons-vue";
import { useStepperStore } from "../../store/Stepper";

const props = defineProps<{
  stepperData: any;
}>();

const emit = defineEmits(["update"]);

const stepperStore = useStepperStore();
const { goalOptions } = stepperStore;

const handleChange = (value: string | number | boolean | undefined) => {
  const option = goalOptions.find((opt) => opt.id === value);
  if (option) {
    emit("update", { field: "goal", value: option });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/generator/goal-step.scss";
</style>

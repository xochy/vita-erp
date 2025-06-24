<template>
  <div class="step-section">
    <div class="step-header">
      <el-icon class="step-icon"><Odometer /></el-icon>
      <h2>What's Your Experience Level?</h2>
      <p>This helps us adjust the difficulty</p>
    </div>

    <el-radio-group
      :model-value="props.stepperData.level?.id || ''"
      @update:model-value="handleChange"
      class="radio-group"
    >
      <el-radio
        v-for="option in levelOptions"
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
import { Odometer } from "@element-plus/icons-vue";
import { useStepperStore } from "../../store/Stepper";

const props = defineProps<{
  stepperData: any;
}>();

const emit = defineEmits(["update"]);

const stepperStore = useStepperStore();
const { levelOptions } = stepperStore;

const handleChange = (value: string | number | boolean | undefined) => {
  const option = levelOptions.find((opt) => opt.id === value);
  if (option) {
    emit("update", { field: "level", value: option });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/generator/level-step.scss";
</style>

<template>
  <div class="step-section">
    <div class="step-header">
      <el-icon class="step-icon"><User /></el-icon>
      <h2>Select Your Sex</h2>
      <p>This helps us personalize your recommendations</p>
    </div>

    <el-radio-group
      :model-value="props.stepperData.sex?.id || ''"
      @update:model-value="handleChange"
      class="radio-group"
    >
      <el-radio
        v-for="option in sexOptions"
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
import { User } from "@element-plus/icons-vue";
import { useStepperStore } from "../../store/Stepper";

const props = defineProps<{
  stepperData: any;
}>();

const emit = defineEmits(["update"]);

const stepperStore = useStepperStore();
const { sexOptions } = stepperStore;

const handleChange = (value: string | number | boolean | undefined) => {
  const option = sexOptions.find((opt) => opt.id === value);
  if (option) {
    emit("update", { field: "sex", value: option });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/generator/sex-step.scss";
</style>

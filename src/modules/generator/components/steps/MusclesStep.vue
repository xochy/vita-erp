<template>
  <div class="step-section">
    <div class="step-header">
      <el-icon class="step-icon"><View /></el-icon>
      <h2>Target Muscle Groups</h2>
      <p>Which muscles do you want to focus on?</p>
    </div>

    <el-checkbox-group
      :model-value="props.stepperData.muscles.map((m: any) => m.id)"
      @update:model-value="handleChange"
      class="checkbox-group"
    >
      <el-checkbox
        v-for="option in muscleOptions"
        :key="option.id"
        :value="option.id"
        size="large"
        class="checkbox-option"
      >
        {{ option.name }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ElCheckboxGroup, ElCheckbox, ElIcon } from "element-plus";
import { View } from "@element-plus/icons-vue";
import { useStepperStore } from "../../store/Stepper";

const props = defineProps<{
  stepperData: any;
}>();

const emit = defineEmits(["update"]);

const stepperStore = useStepperStore();
const { muscleOptions } = stepperStore;

const handleChange = (values: (string | number)[]) => {
  const selectedOptions = muscleOptions.filter((opt) => values.includes(opt.id));
  emit("update", { field: "muscles", value: selectedOptions });
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/generator/muscles-step.scss";
</style>

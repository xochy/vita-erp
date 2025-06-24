<template>
  <div class="step-section">
    <div class="step-header">
      <el-icon class="step-icon"><MagicStick /></el-icon>
      <h2>Available Equipment</h2>
      <p>Select all equipment you have access to</p>
    </div>

    <el-checkbox-group
      :model-value="props.stepperData.equipment.map((e: any) => e.id)"
      @update:model-value="handleChange"
      class="checkbox-group"
    >
      <el-checkbox
        v-for="option in equipmentOptions"
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
import { MagicStick } from "@element-plus/icons-vue";
import { useStepperStore } from "../../store/Stepper";

const props = defineProps<{
  stepperData: any;
}>();

const emit = defineEmits(["update"]);

const stepperStore = useStepperStore();
const { equipmentOptions } = stepperStore;

const handleChange = (values: (string | number)[]) => {
  const selectedOptions = equipmentOptions.filter((opt) => values.includes(opt.id));
  emit("update", { field: "equipment", value: selectedOptions });
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/generator/equipment-step.scss";
</style>

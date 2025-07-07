<template>
  <!-- #region::Form Item Container -->
  <FormItem :name="name" :label="label" :tooltip="tooltip">
    <!-- #region::Element Plus Select -->
    <el-select
      v-model="selectedValue"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :filterable="filterable"
      clearable
      @change="handleChange"
    >
      <!-- #region::Select Options -->
      <el-option
        v-for="option in options"
        :key="option.id"
        :label="getOptionLabel(option)"
        :value="option.id"
      />
      <!-- #endregion::Select Options -->
    </el-select>
    <!-- #endregion::Element Plus Select -->
  </FormItem>
  <!-- #endregion::Form Item Container -->
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";
import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";
import type { ModelData } from "@/modules/shared/translations/interfaces/modelLinks";

interface Props<T extends BaseModel> {
  modelValue: ModelData | null | undefined;
  // Array of options that extend BaseModel
  options: T[];
  // Property name to display as label in the select options
  displayProperty: keyof T["attributes"];
  // Type string for the ModelData structure (e.g., 'categories', 'muscles', etc.)
  dataType: string;
  // Form field name for validation
  name: string;
  // Form field label
  label: string;
  // Tooltip text for the field
  tooltip: string;
  // Placeholder text for the select
  placeholder?: string;
  // Enable/disable the select
  disabled?: boolean;
  // Enable/disable filtering functionality
  filterable?: boolean;
}

const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "Seleccionar...",
  disabled: false,
  filterable: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: ModelData | null];
}>();

/**
 * Computed property to handle the selected value
 * Maps between the internal select value (id) and the external ModelData structure
 */
const selectedValue = computed({
  get: () => {
    if (!props.modelValue?.data?.id) {
      return null;
    }
    return props.modelValue.data.id;
  },
  set: (value: string | null) => {
    if (!value) {
      emit("update:modelValue", null);
      return;
    }

    // Create ModelData structure when a value is selected
    const modelData: ModelData = {
      data: {
        type: props.dataType,
        id: value,
      },
    };

    emit("update:modelValue", modelData);
  },
});

/**
 * Get the display label for an option
 * @param option - The option object
 * @returns The string value to display
 */
const getOptionLabel = (option: T): string => {
  const value = option.attributes[props.displayProperty as string];
  return typeof value === "string" ? value : String(value);
};

/**
 * Handle select change event
 * @param value - The selected value (option id)
 */
const handleChange = (value: string | null) => {
  selectedValue.value = value;
};
</script>

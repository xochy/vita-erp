<template>
  <FormItem :name="name" :label="label" :tooltip="tooltip">
    <el-radio-group
      v-model="selectedValue"
      :name="name"
      :disabled="disabled"
      @change="handleChange"
    >
      <el-radio
        v-for="(option, index) in internalOptions"
        :key="getOptionKey(option, index)"
        :label="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </el-radio>
    </el-radio-group>
  </FormItem>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";
import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";
import type { ModelData } from "@/modules/shared/translations/interfaces/modelLinks";

// Define a type that can be either ModelData or a string
type ModelValueType = ModelData | string | null | undefined;

interface Props<T extends BaseModel> {
  modelValue: ModelValueType;
  // Array of options that can extend BaseModel or be a simple string array
  options: T[] | string[];
  // Property name to display as label in the radio options, only applicable if options are BaseModel
  displayProperty?: keyof T["attributes"];
  // Type string for the ModelData structure (e.g., 'categories', 'muscles', etc.), only applicable if modelValue is ModelData
  dataType?: string;
  // Form field name for validation
  name: string;
  // Form field label
  label: string;
  // Tooltip text for the field
  tooltip: string;
  // Enable/disable the radio group
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props<T>>(), {
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: ModelValueType];
}>();

/**
 * Computed property to determine if the component is handling a BaseModel array or a string array.
 */
const isBaseModelOptions = computed(() => {
  return (
    props.options &&
    (props.options as T[]).length > 0 &&
    typeof (props.options as T[])[0] === "object" &&
    "id" in (props.options as T[])[0]
  );
});

/**
 * Computed property to process options based on their type.
 * If options are string[], it returns them directly.
 * If options are BaseModel[], it returns them directly.
 */
const internalOptions = computed(() => {
  return props.options;
});

/**
 * Computed property to handle the selected value.
 * Maps between the internal radio value (string) and the external ModelValueType structure (ModelData or string).
 */
const selectedValue = computed({
  get: () => {
    if (typeof props.modelValue === "string") {
      return props.modelValue;
    } else if (props.modelValue?.data?.id) {
      return props.modelValue.data.id;
    }
    return null;
  },
  set: (value: string | null) => {
    if (isBaseModelOptions.value) {
      // Handle ModelData structure
      if (!value) {
        emit("update:modelValue", null);
        return;
      }

      if (!props.dataType) {
        console.error("dataType prop is required when using BaseModel options.");
        return;
      }

      const modelData: ModelData = {
        data: {
          type: props.dataType as string,
          id: value,
        },
      };
      emit("update:modelValue", modelData);
    } else {
      // Handle direct string value
      emit("update:modelValue", value);
    }
  },
});

/**
 * Get the display label for an option.
 * @param option - The option object or string.
 * @returns The string value to display.
 */
const getOptionLabel = (option: T | string): string => {
  if (isBaseModelOptions.value && typeof option === "object" && props.displayProperty) {
    const value = (option as T).attributes[props.displayProperty as string];
    return typeof value === "string" ? value : String(value);
  } else if (typeof option === "string") {
    return option; // For simple string options, label is the string itself
  }
  return "";
};

/**
 * Get the value for an option.
 * @param option - The option object or string.
 * @returns The string value.
 */
const getOptionValue = (option: T | string): string => {
  if (isBaseModelOptions.value && typeof option === "object") {
    return (option as T).id;
  } else if (typeof option === "string") {
    return option; // For simple string options, value is the string itself
  }
  return "";
};

/**
 * Get a unique key for an option, essential for v-for.
 * @param option - The option object or string.
 * @param index - The index of the option in the array.
 * @returns A unique key string.
 */
const getOptionKey = (option: T | string, index: number): string => {
  if (isBaseModelOptions.value && typeof option === "object") {
    return (option as T).id;
  } else if (typeof option === "string") {
    return `${option}-${index}`; // Use string and index for simple string options
  }
  return `${index}`; // Fallback
};

/**
 * Handle radio group change event.
 * @param value - The selected value (option id or string).
 */
const handleChange = (value: string | number) => {
  // Ensure value is consistently a string before passing to setter
  selectedValue.value = String(value);
};
</script>

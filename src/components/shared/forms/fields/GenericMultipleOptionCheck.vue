<template>
  <FormItem :name="name" :label="label" :tooltip="tooltip">
    <el-checkbox-group
      v-model="selectedValues"
      :name="name"
      :disabled="disabled"
      @change="handleChange"
    >
      <el-checkbox
        v-for="(option, index) in internalOptions"
        :key="getOptionKey(option, index)"
        :label="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </el-checkbox>
    </el-checkbox-group>
  </FormItem>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";
import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";
import type { MultipleModelData } from "@/modules/shared/translations/interfaces/modelLinks";

// Define a type that can be either MultipleModelData or a string (JSON array)
type ModelValueType = MultipleModelData | string | null | undefined;

interface Props<T extends BaseModel> {
  modelValue: ModelValueType;
  // Array of options that can extend BaseModel or be a simple string array
  options: T[] | string[];
  // Property name to display as label in the checkbox options, only applicable if options are BaseModel
  displayProperty?: keyof T["attributes"];
  // Type string for the MultipleModelData structure (e.g., 'categories', 'muscles', etc.), only applicable if modelValue is MultipleModelData
  dataType?: string;
  // Form field name for validation
  name: string;
  // Form field label
  label: string;
  // Tooltip text for the field
  tooltip: string;
  // Enable/disable the checkbox group
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
    ((props.options as unknown) as T[]).length > 0 &&
    typeof ((props.options as unknown) as T[])[0] === "object" &&
    "id" in ((props.options as unknown) as T[])[0]
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
 * Computed property to handle the selected values.
 * Maps between the internal checkbox values (string[]) and the external ModelValueType structure (MultipleModelData or JSON string).
 */
const selectedValues = computed({
  get: () => {
    if (typeof props.modelValue === "string") {
      try {
        const parsed = JSON.parse(props.modelValue);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch (e) {
        // If parsing fails, log the error and return an empty array as fallback
        if (e instanceof Error) {
          console.warn("Failed to parse modelValue as JSON string:", props.modelValue, e.message);
        } else {
          console.warn("Failed to parse modelValue as JSON string:", props.modelValue);
        }
        return [];
      }
    } else if (props.modelValue?.data && Array.isArray(props.modelValue.data)) {
      return props.modelValue.data.map((item) => item.id);
    }
    return [];
  },
  set: (values: string[]) => {
    if (isBaseModelOptions.value) {
      // Handle MultipleModelData structure
      if (!values || values.length === 0) {
        emit("update:modelValue", null);
        return;
      }

      if (!props.dataType) {
        console.error("dataType prop is required when using BaseModel options.");
        return;
      }

      const multipleModelData: MultipleModelData = {
        data: values.map((id) => ({
          type: props.dataType as string,
          id: id,
        })),
      };
      emit("update:modelValue", multipleModelData);
    } else {
      // Handle JSON string array
      if (!values || values.length === 0) {
        emit("update:modelValue", "[]"); // Return empty JSON array string
        return;
      }
      emit("update:modelValue", JSON.stringify(values));
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
 * Handle checkbox group change event.
 * @param values - The selected values (option ids or strings).
 */
const handleChange = (values: (string | number)[]) => {
  // Ensure values are consistently strings before passing to setter
  selectedValues.value = values.map(String);
};
</script>

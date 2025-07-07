<template>
  <!-- #region::Form Item Container -->
  <FormItem
    :name="name"
    :label="label"
    :tooltip="tooltip"
  >
    <!-- #region::Element Plus Multiple Select -->
    <el-select
      v-model="selectedValues"
      :placeholder="dynamicPlaceholder"
      :name="name"
      :disabled="disabled"
      :filterable="filterable"
      multiple
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
    <!-- #endregion::Element Plus Multiple Select -->
  </FormItem>
  <!-- #endregion::Form Item Container -->
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";
import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";
import type { MultipleModelData } from "@/modules/shared/translations/interfaces/modelLinks";

interface Props<T extends BaseModel> {
  modelValue: MultipleModelData | null | undefined;
  // Array of options that extend BaseModel
  options: T[];
  // Property name to display as label in the select options
  displayProperty: keyof T['attributes'];
  // Type string for the MultipleModelData structure (e.g., 'categories', 'muscles', etc.)
  dataType: string;
  // Form field name for validation
  name: string;
  // Form field label
  label: string;
  // Tooltip text for the field
  tooltip: string;
  // Placeholder text for the select when empty
  placeholder?: string;
  // Enable/disable the select
  disabled?: boolean;
  // Enable/disable filtering functionality
  filterable?: boolean;
}

const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "Seleccionar opciones...",
  disabled: false,
  filterable: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: MultipleModelData | null];
}>();

/**
 * Computed property to handle the selected values
 * Maps between the internal select values (string[]) and the external MultipleModelData structure
 */
const selectedValues = computed({
  get: () => {
    if (!props.modelValue?.data || !Array.isArray(props.modelValue.data)) {
      return [];
    }
    return props.modelValue.data.map(item => item.id);
  },
  set: (values: string[]) => {
    if (!values || values.length === 0) {
      emit("update:modelValue", null);
      return;
    }

    // Create MultipleModelData structure when values are selected
    const multipleModelData: MultipleModelData = {
      data: values.map(id => ({
        type: props.dataType,
        id: id,
      })),
    };

    emit("update:modelValue", multipleModelData);
  },
});

/**
 * Computed property for dynamic placeholder
 * Shows selected option names up to 3 items, then "y X más"
 */
const dynamicPlaceholder = computed(() => {
  const selectedIds = selectedValues.value;

  if (!selectedIds || selectedIds.length === 0) {
    return props.placeholder;
  }

  // Get the selected options
  const selectedOptions = props.options.filter(option =>
    selectedIds.includes(option.id)
  );

  if (selectedOptions.length === 0) {
    return props.placeholder;
  }

  const maxDisplayed = 3;
  const displayedNames = selectedOptions
    .slice(0, maxDisplayed)
    .map(option => getOptionLabel(option));

  if (selectedOptions.length <= maxDisplayed) {
    return displayedNames.join(", ");
  }

  const remaining = selectedOptions.length - maxDisplayed;
  return `${displayedNames.join(", ")} y ${remaining} más`;
});

/**
 * Get the display label for an option
 * @param option - The option object
 * @returns The string value to display
 */
const getOptionLabel = (option: T): string => {
  const value = option.attributes[props.displayProperty as string];
  return typeof value === 'string' ? value : String(value);
};

/**
 * Handle select change event
 * @param values - The selected values (option ids)
 */
const handleChange = (values: string[]) => {
  selectedValues.value = values;
};
</script>
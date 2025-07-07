<template>
  <FormItem :name="name" :label="label" :tooltip="tooltip">
    <el-select
      v-model="selectedIdsFromSelect"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :filterable="filterable"
      multiple
      clearable
      @change="handleSelectChange"
    >
      <el-option
        v-for="option in options"
        :key="option.id"
        :label="getOptionLabel(option)"
        :value="option.id"
      />
    </el-select>
    <div class="selected-options-with-pivot-container" v-if="selectedOptionsWithData.length > 0">
      <div
        v-for="selectedOption in selectedOptionsWithData"
        :key="selectedOption.id"
        class="selected-option-card"
      >
        <span class="selected-option-label">{{ getOptionLabel(selectedOption) }}</span>
        <el-radio-group
          v-model="internalPivotData[selectedOption.id]"
          class="pivot-radio-group"
          @change="handlePivotChange"
        >
          <el-radio v-for="pivotOpt in pivotOptions" :key="pivotOpt" :label="pivotOpt">
            {{ pivotOpt }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </FormItem>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { defineProps, defineEmits, computed, ref, reactive, watch } from "vue";
import FormItem from "@/components/form/FormItem.vue";
import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";
import type {
  MultipleModelData,
  Data,
} from "@/modules/shared/translations/interfaces/modelLinks";

interface Props<T extends BaseModel> {
  modelValue: MultipleModelData | null | undefined;
  // Array of options that extend BaseModel
  options: T[];
  // Property name to display as label in the select options
  displayProperty: keyof T["attributes"];
  // Type string for the MultipleModelData structure (e.g., 'categories', 'muscles', etc.)
  dataType: string;
  // Array of options for the pivot (e.g., ["Principal", "Secondary"])
  pivotOptions: string[];
  // The name of the attribute within the pivot object (e.g., "priority")
  pivotAttributeName: string;
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
  placeholder: "Select options...",
  disabled: false,
  filterable: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: MultipleModelData | null];
}>();

// Internal state for the el-select's v-model (just IDs)
const selectedIdsFromSelect = ref<string[]>([]);
// Internal state to store pivot data for each selected ID
const internalPivotData = reactive<Record<string, string | null>>({});

/**
 * Computed property that filters the full options list to only include
 * those that are currently selected in the el-select.
 * This is used to render the individual cards with pivot radios.
 */
const selectedOptionsWithData = computed(() => {
  return props.options.filter((option) =>
    selectedIdsFromSelect.value.includes(option.id)
  );
});

/**
 * Initializes internal state from modelValue.
 * This runs once on setup and whenever modelValue changes.
 */
const initializeInternalState = () => {
  const newSelectedIds: string[] = [];
  const newInternalPivotData: Record<string, string | null> = {};

  if (props.modelValue?.data && Array.isArray(props.modelValue.data)) {
    props.modelValue.data.forEach((item) => {
      newSelectedIds.push(item.id);
      if (item.meta?.pivot && item.meta.pivot[props.pivotAttributeName]) {
        newInternalPivotData[item.id] = item.meta.pivot[props.pivotAttributeName];
      } else {
        newInternalPivotData[item.id] = null; // Default to null if no pivot data
      }
    });
  }

  selectedIdsFromSelect.value = newSelectedIds;
  // Clear existing reactive object keys and then assign new ones
  for (const key in internalPivotData) {
    if (internalPivotData.hasOwnProperty(key)) {
      delete internalPivotData[key];
    }
  }
  Object.assign(internalPivotData, newInternalPivotData);
};

// Watch for changes in modelValue to update internal state
watch(() => props.modelValue, initializeInternalState, { immediate: true, deep: true });

/**
 * Emits the updated modelValue based on selected IDs and pivot data.
 */
const emitModelValue = () => {
  if (selectedIdsFromSelect.value.length === 0) {
    emit("update:modelValue", null);
    return;
  }

  const data: Data[] = selectedIdsFromSelect.value.map((id) => {
    const pivotValue = internalPivotData[id];
    const item: Data = {
      type: props.dataType,
      id: id,
    };
    if (pivotValue !== null && pivotValue !== undefined) {
      item.meta = {
        pivot: {
          [props.pivotAttributeName]: pivotValue,
        },
      };
    }
    return item;
  });

  const multipleModelData: MultipleModelData = { data };
  emit("update:modelValue", multipleModelData);
};

/**
 * Handles change event from the el-select (when IDs are selected/deselected).
 * Updates internal pivot data to add/remove entries and then emits the modelValue.
 * @param newSelectedIds - The array of currently selected IDs from the el-select.
 */
const handleSelectChange = (newSelectedIds: string[]) => {
  // Add new selections to internalPivotData with null or a default pivot if desired
  newSelectedIds.forEach((id) => {
    if (!(id in internalPivotData)) {
      internalPivotData[id] = null; // Initialize pivot to null for new selections
    }
  });

  // Remove deselected items from internalPivotData
  for (const id in internalPivotData) {
    if (internalPivotData.hasOwnProperty(id) && !newSelectedIds.includes(id)) {
      delete internalPivotData[id];
    }
  }

  selectedIdsFromSelect.value = newSelectedIds; // Update the ref after internalPivotData is managed
  emitModelValue();
};

/**
 * Handles change event from the pivot radio groups.
 * @param value - The new pivot value for a specific option.
 */
const handlePivotChange = () => {
  emitModelValue();
};

/**
 * Get the display label for an option.
 * @param option - The option object.
 * @returns The string value to display.
 */
const getOptionLabel = (option: T): string => {
  const value = option.attributes[props.displayProperty as string];
  return typeof value === "string" ? value : String(value);
};
</script>

<style scoped>
/* #region::Container for selected options with pivot */
.selected-options-with-pivot-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between cards */
  margin-top: 10px; /* Space from the el-select */
  padding: 10px;
  border: 1px solid var(--el-border-color-light); /* Example border */
  border-radius: var(--el-border-radius-base); /* Example border radius */
  justify-content: center;
  align-items: center;
}
/* #endregion::Container for selected options with pivot */

/* #region::Individual selected option card */
.selected-option-card {
  border: 1px solid var(--el-border-color);
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
/* #endregion::Individual selected option card */

/* #region::Label for selected option */
.selected-option-label {
  font-weight: bold;
  color: var(--el-text-color-regular);
}
/* #endregion::Label for selected option */

/* #region::Pivot radio group styling */
.pivot-radio-group {
  display: flex;
}
/* #endregion::Pivot radio group styling */
</style>

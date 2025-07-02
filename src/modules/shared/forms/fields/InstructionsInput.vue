<template>
  <FormItem
    :name="`attributes.${fieldName}`"
    label="Instructions"
    :tooltip="`Specify ${modelType} instructions`"
  >
    <el-input
      v-model="instructions"
      :placeholder="`Enter ${modelType} instructions`"
      :name="`attributes.${fieldName}`"
      type="textarea"
      :rows="4"
    ></el-input>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";

interface Props {
  modelValue: string;
  fieldName: string;
  modelType: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const instructions = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

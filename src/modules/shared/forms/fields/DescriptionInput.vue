<template>
  <FormItem
    :name="`attributes.${fieldName}`"
    label="Description"
    :tooltip="`Specify a ${modelType} description`"
  >
    <el-input
      v-model="description"
      :placeholder="`Enter ${modelType} description`"
      :name="`attributes.${fieldName}`"
      type="textarea"
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

const description = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
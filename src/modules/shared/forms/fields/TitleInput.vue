<template>
  <FormItem
    :name="`attributes.${fieldName}`"
    label="Title"
    :tooltip="`Specify a ${modelType} title`"
  >
    <el-input
      v-model="title"
      :placeholder="`Enter ${modelType} title`"
      :name="`attributes.${fieldName}`"
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

const title = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
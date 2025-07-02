<template>
  <FormItem
    :name="`attributes.${fieldName}`"
    label="Name"
    :tooltip="`Specify a ${modelType} name`"
  >
    <el-input
      v-model="name"
      :placeholder="`Enter ${modelType} name`"
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

const name = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<template>
  <FormItem
    name="attributes.name"
    label="Name"
    tooltip="Specify a category name"
  >
    <el-input
      v-model="name"
      placeholder="Enter category name"
      name="attributes.name"
    ></el-input>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const name = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
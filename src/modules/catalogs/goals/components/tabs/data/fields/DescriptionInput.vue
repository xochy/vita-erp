<template>
  <FormItem
    name="attributes.description"
    label="Description"
    tooltip="Specify a goal description"
  >
    <el-input
      v-model="description"
      placeholder="Enter goal description"
      name="attributes.description"
      type="textarea"
    ></el-input>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const description = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

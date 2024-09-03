<template>
  <FormItem
    name="attributes.email"
    label="Email"
    tooltip="Specify a user email"
  >
    <el-input
      v-model="email"
      placeholder="Enter user email"
      name="attributes.email"
    ></el-input>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const email = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
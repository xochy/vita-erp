<template>
  <FormItem
    name="attributes.password"
    label="Password"
    tooltip="Specify a user password"
  >
    <el-input
      v-model="password"
      placeholder="Enter user password"
      name="attributes.password"
      show-password
    ></el-input>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";

const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits(["update:modelValue"]);

const password = computed({
  get: () => props.modelValue ?? "",
  set: (value: string) => emit("update:modelValue", value),
});
</script>
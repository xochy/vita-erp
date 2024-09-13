<template>
  <FormItem
    name="attributes.translation"
    :label="field"
    :tooltip="`Enter ${fieldLowerCase} translation`"
  >
    <el-input
      v-model="translation"
      name="attributes.translation"
      :placeholder="`Enter ${fieldLowerCase} translation`"
      :type="type"
      :rows="4"
    ></el-input>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";

const props = defineProps<{ modelValue: string; field: string; type: string }>();
const emit = defineEmits(["update:modelValue"]);

const translation = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const fieldLowerCase = computed(() => props.field.toLowerCase());
</script>

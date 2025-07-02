<template>
  <FormItem
    :name="name" :label="label"
    :tooltip="tooltip"
  >
    <el-input
      v-model="value"
      :placeholder="placeholder"
      :name="name"
      :type="type"
    ></el-input>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";

interface Props {
  modelValue: string;
  // name ahora debe ser la ruta completa a la propiedad dentro del objeto model,
  // ej: 'attributes.name', 'attributes.title'
  name: string;
  label: string;
  placeholder: string;
  tooltip: string;
  type?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});
</script>
<template>
  <FormItem
    name="relationships.roles.data"
    label="Roles"
    tooltip="Select the roles that the user will have"
  >
    <el-select
      v-model="roles"
      multiple
      filterable
      placeholder="Select roles"
      name="relationships.roles.data"
      value-key="id"
    >
      <el-option
        v-for="roleFlat in rolesFlat"
        :key="roleFlat.id"
        :label="roleFlat.display_name"
        :value="roleFlat"
      ></el-option>
    </el-select>
  </FormItem>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import FormItem from "@/components/form/FormItem.vue";
import useRolesFlat from "../../composables/UseRolesFlatStore";
import type { RoleFlat } from "../../interfaces";

const props = defineProps<{ modelValue?: RoleFlat[] }>();
const emit = defineEmits(["update:modelValue"]);

const { rolesFlat } = useRolesFlat();

const roles = computed<RoleFlat[]>({
  get: () => props.modelValue ?? [],
  set: (value: RoleFlat[]) => emit("update:modelValue", value),
});
</script>
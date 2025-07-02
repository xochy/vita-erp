<template>
  <BasicCard :title="formTitle">
    <el-form
      v-loading="composable.isLoading.value"
      :id="formId"
      ref="genericFormRef"
      class="form"
      :model="composable.item.value" :rules="validationRules"
      @submit.prevent="submit()"
    >
      <slot name="default" :model="composable.item.value"></slot>

      <el-row class="mb-4" :gutter="20">
        <el-col :span="12" :offset="0">
          <el-button
            type="primary"
            @click="submit"
            :icon="Edit"
            :loading="composable.isLoading.value"
          >
            <span v-if="composable.isLoading.value">Please wait...</span>
            <span v-else>Save</span>
          </el-button>
          <el-button type="info" @click="handleClear">Clear</el-button>
        </el-col>
      </el-row>
      </el-form>
  </BasicCard>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import { Edit } from "@element-plus/icons-vue";
import type { FormRules } from "element-plus";

interface Props {
  formTitle: string;
  formId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  composable: any; // El composable específico (e.g., useCategory, useMuscle, useEquipment)
  validationRules: FormRules;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any; // Datos iniciales para el modelo (opcional)
}

const props = defineProps<Props>();
const emit = defineEmits(["saved"]);

const genericFormRef = ref<null | HTMLFormElement>(null);

// Inicializar el modelo del composable si se proporciona initialData
// Asume que el composable tiene un método setItem o se puede asignar directamente a item.value
if (props.initialData) {
  props.composable.item.value = { ...props.initialData };
}

// Proporcionar el modelo a los slots (el item completo)
provide("formModel", props.composable.item);

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Submit the form data and save the entity.
 * @returns {void}
 */
const submit = () => {
  if (!genericFormRef.value) return;

  genericFormRef.value.validate(async (valid) => {
    if (!valid) return;

    if (props.composable.item.value.id) {
      await props.composable.update(props.composable.item.value);
    } else {
      await props.composable.create(props.composable.item.value);
    }
    emit("saved");
  });
};

/**
 * @description Clear the form data.
 * @returns {void}
 */
const handleClear = () => {
  // Ahora usamos el método clearItem del composable, que es más seguro
  props.composable.clearItem();
};
</script>
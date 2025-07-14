<template>
  <GenericForm
    formTitle="Workout Form"
    formId="workout_saving_form"
    :composable="useWorkoutStoreInstance"
    :validationRules="rules"
    @saved="handleSaved"
  >
    <template #default="{ model }">
      <el-row :gutter="20">
        <el-col :span="12">
          <GenericTextInput
            v-model="model.attributes.name"
            name="attributes.name"
            label="Name"
            placeholder="Enter workout name"
            tooltip="Specify a workout name"
          />
        </el-col>
        <el-col :span="12">
          <!-- #region::Category Select -->
          <GenericOptionSelect
            v-model="model.relationships.category"
            :v-loading="isLoadingCategories"
            :options="categories"
            display-property="name"
            data-type="categories"
            name="relationships.category"
            label="Category"
            placeholder="Select a category"
            tooltip="Choose the workout category"
          />
          <!-- #endregion::Category Select -->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- #region::Muscles Multiple Select -->
          <GenericMultipleOptionSelectWithPivot
            v-model="model.relationships.muscles"
            :options="muscles"
            display-property="name"
            data-type="muscles"
            :pivot-options="musclePriorityOptions"
            pivot-attribute-name="priority"
            name="relationships.muscles"
            label="Muscles"
            placeholder="Select muscles..."
            tooltip="Choose the muscles worked in this exercise and their priority"
          />
          <!-- #endregion::Muscles Multiple Select -->
        </el-col>
        <el-col :span="12">
          <!-- #region::Equipments Multiple Select -->
          <GenericMultipleOptionSelect
            v-model="model.relationships.equipments"
            :options="equipments"
            display-property="name"
            data-type="equipments"
            name="relationships.equipments"
            label="Equipments"
            placeholder="Select equipments..."
            tooltip="Choose the equipment needed for this exercise"
          />
          <!-- #endregion::Equipments Multiple Select -->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericTextInput
            v-model="model.attributes.performance"
            name="attributes.performance"
            label="Performance"
            placeholder="Enter workout performance"
            tooltip="Specify a workout performance"
            type="textarea"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <GenericMultipleOptionCheck
            v-model="model.attributes.levels"
            :options="levelOptions"
            name="attributes.levels"
            label="Levels"
            tooltip="Select the workout difficulty levels"
          />
        </el-col>
        <el-col :span="12">
          <GenericOptionRadio
            v-model="model.attributes.group"
            :options="groupOptions"
            name="attributes.group"
            label="Group"
            tooltip="Select the workout group"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <GenericImagesUploader v-model="images" />
        </el-col>
      </el-row>
    </template>
  </GenericForm>
</template>

<script setup lang="ts">
import GenericForm from "@/components/shared/forms/GenericForm.vue";
import GenericImagesUploader from "@/components/shared/forms/fields/GenericImagesUploader.vue";
import GenericMultipleOptionCheck from "@/components/shared/forms/fields/GenericMultipleOptionCheck.vue";
import GenericMultipleOptionSelect from "@/components/shared/forms/fields/GenericMultipleOptionSelect.vue";
import GenericMultipleOptionSelectWithPivot from "@/components/shared/forms/fields/GenericMultipleOptionSelectWithPivot.vue";
import GenericOptionRadio from "@/components/shared/forms/fields/GenericOptionRadio.vue";
import GenericOptionSelect from "@/components/shared/forms/fields/GenericOptionSelect.vue";
import GenericTextInput from "@/components/shared/forms/fields/GenericTextInput.vue";
import type { Media } from "@/modules/media/files/interfaces";
import type { UploadUserFile } from "element-plus";
import { onMounted, ref } from "vue";
import { rules } from "../validation/workoutFormValidationRules";
import { useFlatCategories } from "@/modules/catalogs/categories/composables/UseFlatCategoriesStore";
import { useFlatEquipments } from "@/modules/catalogs/equipments/composables/UseFlatEquipmentsStore";
import { useFlatMuscles } from "@/modules/catalogs/muscles/composables/UseFlatMusclesStore";
import { useWorkout } from "../composables/UseWorkoutStore";

/* ------------------------------ Props & Refs ------------------------------ */

const FLAT_MODEL_FIELDS_SET = "name";

const props = defineProps<{ files: UploadUserFile[] }>();

const images = ref<UploadUserFile[]>(props.files || []);
const useWorkoutStoreInstance = useWorkout();

onMounted(() => {
  console.log("WorkoutForm mounted");
});

const {
  items: categories,
  status: { isLoading: isLoadingCategories, isError: isErrorCategories },
} = useFlatCategories(FLAT_MODEL_FIELDS_SET);

const {
  items: muscles,
  status: { isLoading: isLoadingMuscles, isError: isErrorMuscles },
} = useFlatMuscles(FLAT_MODEL_FIELDS_SET);

const {
  items: equipments,
  status: { isLoading: isLoadingEquipments, isError: isErrorEquipments },
} = useFlatEquipments(FLAT_MODEL_FIELDS_SET);

// Options for the levels checkbox
const levelOptions = ["beginner", "intermediate", "advanced"];

// Options for the group radio
const groupOptions = ["Free weights", "Machines", "Others"];

// Options for muscle priority pivot
const musclePriorityOptions = ["Principal", "Secondary", "Antagonist"];

/* -------------------------------- Functions ------------------------------- */

const handleSaved = async () => {
  emit("saved", []);
};

/* --------------------------------- Emmits --------------------------------- */

const emit = defineEmits<{
  saved: [medias: Media[]];
}>();
</script>

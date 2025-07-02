<template>
  <BasicSkeleton v-if="isLoading" />

  <el-row :gutter="20" v-else>
    <el-col :span="colSpanMainContent">
      <BasicCard :title="displayTitle" :footer="canDelete">
        <p>{{ displayDescription }}</p>
        <template #footer>
          <el-col class="button-col">
            <el-tooltip content="Delete">
              <el-button
                type="danger"
                :icon="Delete"
                @click="handleDeleteModel(Number(model.id))"
              />
            </el-tooltip>
          </el-col>
        </template>
      </BasicCard>
    </el-col>

    <el-col :span="colSpanImageSection" v-if="hasImageSection">
      <BasicCard>
        <slot name="image-section" :images="images">
          <MusclesImagesCarousel v-if="images && images.length > 0" :images="images" />
          <el-empty v-else description="No images" :image-size="100" />
        </slot>
      </BasicCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import MusclesImagesCarousel from "@/components/shared/carousels/MusclesImagesCarousel.vue";
import type { Media } from "@/modules/media/files/interfaces";
import { Delete } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";

/* ------------------------------ Generic types ----------------------------- */

// Generic model type to allow flexibility in attributes
type GenericModel<T = any> = {
  id: string | number;
  attributes: T;
  [key: string]: any; // To allow other properties at the model level
};

// Type for formatting functions
type FormatterFn = (model: GenericModel) => string;

/* ------------------------------ Props ------------------------------ */

const props = defineProps<{
  model: GenericModel;
  isLoading: boolean;
  deleteFunction: (id: number) => Promise<any>;
  redirectRouteName: string;
  canDelete: boolean;
  images?: Media[];
  hasImageSection?: boolean;
  /**
   * Key inside `model.attributes` to use as the title
   * If `titleFormatter` is provided, this key is ignored
   */
  titleKey?: string;
  /**
   * Function to format the title. Receives the complete `model`
   * If provided, overrides `titleKey`
   */
  titleFormatter?: FormatterFn;
  /**
   * Key inside `model.attributes` to use as the description
   * If `descriptionFormatter` is provided, this key is ignored
   */
  descriptionKey?: string;
  /**
   * Function to format the description. Receives the complete `model`
   * If provided, overrides `descriptionKey`
   */
  descriptionFormatter?: FormatterFn;
}>();

/* -------------------------------- computed -------------------------------- */

const colSpanMainContent = computed(() => (props.hasImageSection ? 19 : 24));
const colSpanImageSection = computed(() => (props.hasImageSection ? 5 : 0));

const displayTitle = computed(() => {
  if (props.titleFormatter) {
    return props.titleFormatter(props.model);
  }
  // Fallback to model.attributes.name if no titleFormatter is provided
  // and check for titleKey in model.attributes
  if (
    props.titleKey &&
    props.model.attributes &&
    typeof props.model.attributes === "object" &&
    props.titleKey in props.model.attributes
  ) {
    return props.model.attributes[props.titleKey as keyof typeof props.model.attributes];
  }
  return props.model.attributes?.name || "Untitled"; // Default if nothing is found
});

const displayDescription = computed(() => {
  if (props.descriptionFormatter) {
    return props.descriptionFormatter(props.model);
  }
  // Fallback to model.attributes.description if no descriptionFormatter is provided
  if (
    props.descriptionKey &&
    props.model.attributes &&
    typeof props.model.attributes === "object" &&
    props.descriptionKey in props.model.attributes
  ) {
    return props.model.attributes[
      props.descriptionKey as keyof typeof props.model.attributes
    ];
  }
  return props.model.attributes?.description || "No description available."; // Default if nothing is found
});

/* -------------------------------- Functions ------------------------------- */

const handleDeleteModel = useDeleteHandler().handleDelete(
  "Are you sure you want to delete this item?",
  "Deleting",
  props.deleteFunction,
  props.redirectRouteName
);
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>

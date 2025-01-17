<template>
  <BasicSkeleton v-if="isLoading" />

  <el-row :gutter="20" v-else>
    <el-col :span="19">
      <BasicCard :title="muscle.attributes.name" :footer="can.destroy">
        <p>{{ muscle.attributes.description }}</p>
        <template #footer>
          <el-col class="button-col">
            <el-tooltip content="Delete">
              <el-button
                type="danger"
                :icon="Delete"
                @click="handleDeleteCategory(Number(muscle.id))"
              />
            </el-tooltip>
          </el-col>
        </template>
      </BasicCard>
    </el-col>
    <el-col :span="5">
      <BasicCard>
        <MusclesImagesCarousel v-if="areImagesAvailable" :images="images" />
        <el-empty v-else description="No images" :image-size="100" />
      </BasicCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import MusclesImagesCarousel from "@/components/shared/carousels/MusclesImagesCarousel.vue";
import type { Media } from "@/modules/media/files/interfaces";
import type { Muscle } from "@/modules/catalogs/muscles/interfaces";
import useMuscle from "../../../composables/UseMuscleStore";
import { Delete } from "@element-plus/icons-vue";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { computed } from "vue";

/* ------------------------------ Props & Refs ------------------------------ */

const props = defineProps<{ muscle: Muscle; isLoading: boolean; images: Media[] }>();

const { can, deleteMuscle } = useMuscle();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- computed -------------------------------- */

const areImagesAvailable = computed(() => props.images.length > 0);

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Handle the deletion of a muscle.
 */
const handleDeleteCategory = handleDelete(
  "Are you sure you want to delete this muscle?",
  "Deleting",
  deleteMuscle,
  "muscles"
);
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>

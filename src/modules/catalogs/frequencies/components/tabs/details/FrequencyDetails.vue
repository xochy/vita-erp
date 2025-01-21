<template>
  <BasicSkeleton v-if="isLoading" />

  <el-row v-else>
    <el-col :span="24">
      <BasicCard :title="frequency.attributes.name" :footer="can.destroy">
        <p>{{ frequency.attributes.description }}</p>
        <template #footer>
          <el-col class="button-col">
            <el-tooltip content="Delete">
              <el-button
                type="danger"
                :icon="Delete"
                @click="handleDeleteFrequency(Number(frequency.id))"
              />
            </el-tooltip>
          </el-col>
        </template>
      </BasicCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import type { Frequency } from "@/modules/catalogs/frequencies/interfaces";
import useFrequency from "../../../composables/UseFrequencyStore";
import { Delete } from "@element-plus/icons-vue";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ frequency: Frequency; isLoading: boolean }>();

const { can, deleteFrequency } = useFrequency();
const { handleDelete } = useDeleteHandler();

/**
 * @description Handle the deletion of a frequency.
 */
const handleDeleteFrequency = handleDelete(
  "Are you sure you want to delete this frequency?",
  "Deleting",
  deleteFrequency,
  "frequencies"
);
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>

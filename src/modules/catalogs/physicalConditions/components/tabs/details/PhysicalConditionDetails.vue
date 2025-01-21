<template>
  <BasicSkeleton v-if="isLoading" />

  <el-row v-else>
    <el-col :span="24">
      <BasicCard :title="physicalCondition.attributes.name" :footer="can.destroy">
        <p>{{ physicalCondition.attributes.description }}</p>
        <template #footer>
          <el-col class="button-col">
            <el-tooltip content="Delete">
              <el-button
                type="danger"
                :icon="Delete"
                @click="handleDeletePhysicalCondition(Number(physicalCondition.id))"
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
import type { PhysicalCondition } from "@/modules/catalogs/physicalConditions/interfaces";
import usePhysicalCondition from "../../../composables/UsePhysicalConditionStore";
import { Delete } from "@element-plus/icons-vue";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ physicalCondition: PhysicalCondition; isLoading: boolean }>();

const { can, deletePhysicalCondition } = usePhysicalCondition();
const { handleDelete } = useDeleteHandler();

/**
 * @description Handle the deletion of a physical condition.
 */
const handleDeletePhysicalCondition = handleDelete(
  "Are you sure you want to delete this physical condition?",
  "Deleting",
  deletePhysicalCondition,
  "physicalConditions"
);
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>

<template>
  <BasicSkeleton v-if="isLoading" />

<el-row v-else>
  <el-col :span="24">
    <BasicCard :title="goal.attributes.name" :footer="can.destroy">
      <p>{{ goal.attributes.description }}</p>
      <template #footer>
        <el-col class="button-col">
          <el-tooltip content="Delete">
            <el-button
              type="danger"
              :icon="Delete"
              @click="handleDeleteGoal(Number(goal.id))"
            />
          </el-tooltip>
        </el-col>
      </template>
    </BasicCard>
  </el-col>
</el-row>
</template>

<script setup lang="ts">
import BasicCard from '@/components/shared/cards/BasicCard.vue';
import BasicSkeleton from '@/components/shared/skeletons/BasicSkeleton.vue';
import type { Goal } from '@/modules/catalogs/goals/interfaces';
import useGoal from '@/modules/catalogs/goals/composables/UseGoalStore';
import { Delete } from '@element-plus/icons-vue';
import { useDeleteHandler } from '@/modules/shared/utilities/UseModelDeleteHandler';

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ goal: Goal; isLoading: boolean }>();

const { can, deleteGoal } = useGoal();
const { handleDelete } = useDeleteHandler();

/**
 * @description Handle the deletion of a goal.
 */
const handleDeleteGoal = handleDelete(
  'Are you sure you want to delete this goal?',
  'Deleting',
  deleteGoal,
  'goals'
);
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>
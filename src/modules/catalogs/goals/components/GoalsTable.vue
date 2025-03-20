<template>
  <slot name="options"></slot>
  <el-table
    v-loading="isLoading"
    :data="goals"
    style="width: 100%"
    height="640"
    @sort-change="onSortChange"
  >
    <!-- #region::Translations -->
    <el-table-column fixed type="expand" align="left">
      <template #default="props">
        <TranslationsList :path="props.row.relationships.translations.links.related" />
      </template>
    </el-table-column>
    <!-- #endregion::Translations -->

    <!-- #region::Name -->
    <el-table-column
      prop="name"
      label="Name"
      sortable="custom"
      min-width="120"
      width="200"
    >
      <template #default="props">
        <el-link @click="handleLoadGoal(props.row)">
          {{ props.row.attributes.name }}
        </el-link>
      </template>
    </el-table-column>
    <!-- #endregion::Name -->

    <!-- #region::Description -->
    <el-table-column prop="attributes.description" label="Description" />
    <!-- #endregion::Description -->

    <!-- #region::Actions -->
    <ActionsColumn v-if="can.modify" @edit="handleEditGoal" @delete="handleDeleteGoal" />
    <!-- #endregion::Actions -->

    <!-- #region::Empty table message -->
    <template v-if="!isLoading" #empty>
      <TableEmptyResult message="No goals found." />
    </template>
    <!-- #endregion::Empty table message -->
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import ActionsColumn from "@/components/shared/tables/colums/ActionsColumn.vue";
import TableEmptyResult from "@/components/shared/tables/TableEmptyResult.vue";
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import type { Goal } from "../interfaces";
import useGoal from "../composables/UseGoalStore";
import { handleSortChange } from "@/modules/shared/utilities/UseModelSortHandler";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { useRouter } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ goals: Goal[]; isLoading: boolean }>();

const route = useRouter();
const { can, deleteGoal } = useGoal();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the goal details.
 * @param {Goal} goal
 * @returns {void}
 */
const handleLoadGoal = (goal: Goal): void => {
  route.push({
    name: "goals-saving",
    params: { id: String(goal.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a goal.
 * @param {number} goalId
 * @returns {void}
 */
const handleEditGoal = (goalId: number): void => {
  route.push({
    name: "goals-saving",
    params: { id: String(goalId), tab: "goalData" },
  });
};

/**
 * @description Handle the deletion of a goal.
 */
const handleDeleteGoal = handleDelete(
  "Are you sure you want to delete this goal?",
  "Deleting",
  deleteGoal
);

/**
 * @description Handle the sorting of the table.
 * @param {{ prop: string; order: string }} { prop, order }
 */
const onSortChange = ({ prop, order }: { prop: string; order: string }): void => {
  handleSortChange({ prop, order }, emit);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits<(event: "sort-change", value: string) => void>();
</script>

<style scoped>
.el-link {
  cursor: pointer;
  font-size: 13px;
}
</style>

<template>
  <slot name="options"></slot>
  <el-table
    v-loading="isLoading"
    :data="plans"
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
        <el-link @click="handleLoadPlan(props.row)">
          {{ props.row.attributes.name }}
        </el-link>
      </template>
    </el-table-column>
    <!-- #endregion::Name -->

    <!-- #region::Goal -->
    <el-table-column prop="attributes.goalName" label="Goal" />
    <!-- #endregion::Goal -->

    <!-- #region::Frequency -->
    <el-table-column prop="attributes.frequencyName" label="Frequency" />
    <!-- #endregion::Frequency -->

    <!-- #region::Physical condition -->
    <el-table-column prop="attributes.physicalConditionName" label="Physical condition" />
    <!-- #endregion::Physical condition -->

    <!-- #region::Actions -->
    <ActionsColumn v-if="can.modify" @edit="handleEditPlan" @delete="handleDeletePlan" />
    <!-- #endregion::Actions -->

    <!-- #region::Empty table message -->
    <template v-if="!isLoading" #empty>
      <TableEmptyResult message="No plans found." />
    </template>
    <!-- #endregion::Empty table message -->
  </el-table>
</template>

<script setup lang="ts">
import ActionsColumn from "@/components/shared/tables/colums/ActionsColumn.vue";
import TableEmptyResult from "@/components/shared/tables/TableEmptyResult.vue";
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import type { Plan } from "../interfaces";
import usePlan from "../composables/UsePlanStore";
import { handleSortChange } from "@/modules/shared/utilities/UseModelSortHandler";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { useRouter } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ plans: Plan[]; isLoading: boolean }>();

const route = useRouter();
const { can, deletePlan } = usePlan();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the plan details.
 * @param {Plan} plan
 * @returns {void}
 */
const handleLoadPlan = (plan: Plan): void => {
  route.push({
    name: "plans-saving",
    params: { id: String(plan.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a plan.
 * @param {number} planId
 * @returns {void}
 */
const handleEditPlan = (planId: number): void => {
  route.push({
    name: "plans-saving",
    params: { id: String(planId), tab: "planData" },
  });
};

/**
 * @description Handle the deletion of a plan.
 */
const handleDeletePlan = handleDelete(
  "Are you sure you want to delete this plan?",
  "Deleting",
  deletePlan
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

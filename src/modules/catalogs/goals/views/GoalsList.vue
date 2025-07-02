<template>
  <!-- #region::Error State -->
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching goals."
  />
  <!-- #endregion::Error State -->

  <!-- #region::Generic Table for Goals -->
  <GenericTable
    v-else
    :data="items"
    :is-loading="isLoading"
    main-column-prop="name"
    main-column-label="Name"
    show-description-column
    use-link-for-main-column
    show-translations-column
    :can-modify="can.modify"
    :delete-action="destroy"
    @sort-change="setSortBy"
    @load-item="handleLoadGoal"
    @edit-item="handleEditGoal"
    empty-message="No goal found."
    router-name-for-saving="goals-saving"
    main-column-attribute-path="attributes.name"
  >
    <!-- #region::Table Options -->
    <template #options>
      <el-row class="mb-5">
        <el-col :span="6">
          <TableSearcher @search="setSearchBy" />
        </el-col>
      </el-row>
    </template>
    <!-- #endregion::Table Options -->

    <template #columns> </template>

    <!-- #region::Table Pagination -->
    <template #pagination>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="perPage"
        class="center-pagination"
        layout="total, sizes, prev, pager, next, jumper"
        size="small"
        :page-sizes="[5, 10, 15, 20]"
        :disabled="isLoading"
        :total="total"
        @size-change="setPerPage"
        @current-change="setCurrentPage"
      />
    </template>
    <!-- #endregion::Table Pagination -->
  </GenericTable>
  <!-- #endregion::Generic Table for Goals -->
</template>

<script setup lang="ts">
import GenericTable from "@/components/shared/tables/GenericTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import type { Goal } from "../interfaces/goal";
import { useGoal } from "../composables/UseGoalStore";
import { useGoals } from "../composables/UseGoalsStore";
import { useRouter } from "vue-router";

/* ------------------------------ Refs & Props ------------------------------ */

const FIELDS_SET = "name,description,createdAt,translations";

const {
  items,
  status: { isLoading, isError },
  pagination: {
    currentPage,
    perPage,
    total,
    setSortBy,
    setSearchBy,
    setPerPage,
    setCurrentPage,
  },
} = useGoals(FIELDS_SET);

const { can, destroy } = useGoal();

const router = useRouter();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the goal details.
 * @param {Goal} goal
 * @returns {void}
 */
const handleLoadGoal = (goal: Goal): void => {
  router.push({
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
  router.push({
    name: "goals-saving",
    params: { id: String(goalId), tab: "goalData" },
  });
};
</script>

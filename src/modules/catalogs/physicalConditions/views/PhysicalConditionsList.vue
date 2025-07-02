<template>
  <!-- #region::Error State -->
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching physical conditions."
  />
  <!-- #endregion::Error State -->

  <!-- #region::Generic Table for Physical Conditions -->
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
    @load-item="handleLoadPhysicalCondition"
    @edit-item="handleEditPhysicalCondition"
    empty-message="No physical condition found."
    router-name-for-saving="physical-conditions-saving"
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
  <!-- #endregion::Generic Table for Physical Conditions -->
</template>

<script setup lang="ts">
import GenericTable from "@/components/shared/tables/GenericTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import type { PhysicalCondition } from "../interfaces/physicalCondition";
import { usePhysicalCondition } from "../composables/UsePhysicalConditionStore";
import { usePhysicalConditions } from "../composables/UsePhysicalConditionsStore";
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
} = usePhysicalConditions(FIELDS_SET);

const { can, destroy } = usePhysicalCondition();

const router = useRouter();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the physical condition details.
 * @param {PhysicalCondition} physicalCondition
 * @returns {void}
 */
const handleLoadPhysicalCondition = (physicalCondition: PhysicalCondition): void => {
  router.push({
    name: "physical-conditions-saving",
    params: { id: String(physicalCondition.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a physical condition.
 * @param {number} physicalConditionId
 * @returns {void}
 */
const handleEditPhysicalCondition = (physicalConditionId: number): void => {
  router.push({
    name: "physical-conditions-saving",
    params: { id: String(physicalConditionId), tab: "physicalConditionData" },
  });
};
</script>

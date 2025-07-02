<template>
  <!-- #region::Error State -->
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching frequencies."
  />
  <!-- #endregion::Error State -->

  <!-- #region::Generic Table for Frequencies -->
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
    @load-item="handleLoadFrequency"
    @edit-item="handleEditFrequency"
    empty-message="No frequency found."
    router-name-for-saving="frequencies-saving"
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
  <!-- #endregion::Generic Table for Frequencies -->
</template>

<script setup lang="ts">
import GenericTable from "@/components/shared/tables/GenericTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import type { Frequency } from "../interfaces/frequency";
import { useFrequency } from "../composables/UseFrequencyStore";
import { useFrequencies } from "../composables/UseFrequenciesStore";
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
} = useFrequencies(FIELDS_SET);

const { can, destroy } = useFrequency();

const router = useRouter();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the frequency details.
 * @param {Frequency} frequency
 * @returns {void}
 */
const handleLoadFrequency = (frequency: Frequency): void => {
  router.push({
    name: "frequencies-saving",
    params: { id: String(frequency.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a frequency.
 * @param {number} frequencyId
 * @returns {void}
 */
const handleEditFrequency = (frequencyId: number): void => {
  router.push({
    name: "frequencies-saving",
    params: { id: String(frequencyId), tab: "frequencyData" },
  });
};
</script>

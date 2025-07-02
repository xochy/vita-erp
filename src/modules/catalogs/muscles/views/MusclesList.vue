<template>
  <!-- #region::Error State -->
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching muscles."
  />
  <!-- #endregion::Error State -->

  <!-- #region::Generic Table for Muscles -->
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
    @load-item="handleLoadMuscle"
    @edit-item="handleEditMuscle"
    empty-message="No muscle found."
    router-name-for-saving="muscles-saving"
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
  <!-- #endregion::Generic Table for Muscles -->
</template>

<script setup lang="ts">
import GenericTable from "@/components/shared/tables/GenericTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import type { Muscle } from "../interfaces/muscle";
import { useMuscle } from "../composables/UseMuscleStore";
import { useMuscles } from "../composables/UseMusclesStore";
import { useRouter } from "vue-router";

/* ------------------------------ Refs & Props ------------------------------ */

const FIELDS_SET = "name,description,createdAt,translations,medias";

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
} = useMuscles(FIELDS_SET);

const { can, destroy } = useMuscle();

const router = useRouter();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the muscle details.
 * @param {Muscle} muscle
 * @returns {void}
 */
const handleLoadMuscle = (muscle: Muscle): void => {
  router.push({
    name: "muscles-saving",
    params: { id: String(muscle.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a muscle.
 * @param {number} muscleId
 * @returns {void}
 */
const handleEditMuscle = (muscleId: number): void => {
  router.push({
    name: "muscles-saving",
    params: { id: String(muscleId), tab: "muscleData" },
  });
};
</script>

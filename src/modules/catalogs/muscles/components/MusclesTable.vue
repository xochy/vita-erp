<template>
  <slot name="options"></slot>
  <el-table
    v-loading="isLoading"
    :data="muscles"
    style="width: 100%"
    height="640"
    @sort-change="handleSortChange"
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
        <el-link @click="handleLoadMuscle(props.row)">{{
          props.row.attributes.name
        }}</el-link>
      </template>
    </el-table-column>
    <!-- #endregion::Name -->

    <!-- #region::Description -->
    <el-table-column prop="attributes.description" label="Description" width="960" />
    <!-- #endregion::Description -->

    <!-- #region::Actions -->
    <ActionsColumn
      v-if="can.modify"
      @edit="handleEditMuscle"
      @delete="handleDeleteMuscle"
    />
    <!-- #endregion::Actions -->

    <!-- #region::Empty table message -->
    <template v-if="!isLoading" #empty>
      <TableEmptyResult message="No muscles found." />
    </template>
    <!-- #endregion::Empty table message -->
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import ActionsColumn from "@/components/shared/tables/colums/ActionsColumn.vue";
import TableEmptyResult from "@/components/shared/tables/TableEmptyResult.vue";
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import type { Muscle } from "../interfaces";
import useMuscle from "../composables/UseMuscleStore";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { useRouter } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ muscles: Muscle[]; isLoading: boolean }>();

const route = useRouter();
const { can, deleteMuscle } = useMuscle();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the muscle details.
 * @param {Muscle} muscle
 * @returns {void}
 */
const handleLoadMuscle = (muscle: Muscle): void => {
  route.push({
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
  route.push({
    name: "muscles-saving",
    params: { id: String(muscleId), tab: "muscleData" },
  });
};

/**
 * @description Handle the deletion of a muscle.
 */
const handleDeleteMuscle = handleDelete(
  "Are you sure you want to delete this muscle?",
  "Deleting",
  deleteMuscle
);

/**
 * @description Handle the sorting of the table.
 * @param {{ prop: string; order: string }} { prop, order }
 */
const handleSortChange = ({ prop, order }: { prop: string; order: string }): void => {
  let sortValue = "";
  if (order === "ascending") {
    sortValue = prop;
  } else if (order === "descending") {
    sortValue = `-${prop}`;
  }
  emit("sort-change", sortValue);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["sort-change"]);
</script>

<style scoped>
.el-link {
  cursor: pointer;
  font-size: 13px;
}
</style>

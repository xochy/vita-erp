<template>
  <slot name="options"></slot>
  <el-table
    v-loading="isLoading"
    :data="physicalConditions"
    style="width: 100%"
    height="480"
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
        <el-link @click="handleLoadPhysicalCondition(props.row)">
          {{ props.row.attributes.name }}
        </el-link>
      </template>
    </el-table-column>
    <!-- #endregion::Name -->

    <!-- #region::Description -->
    <el-table-column prop="attributes.description" label="Description" />
    <!-- #endregion::Description -->

    <!-- #region::Actions -->
    <ActionsColumn
      v-if="can.modify"
      @edit="handleEditPhysicalCondition"
      @delete="handleDeletePhysicalCondition"
    />
    <!-- #endregion::Actions -->

    <!-- #region::Empty table message -->
    <template v-if="!isLoading" #empty>
      <TableEmptyResult message="No physical conditions found." />
    </template>
    <!-- #endregion::Empty table message -->
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import ActionsColumn from "@/components/shared/tables/colums/ActionsColumn.vue";
import TableEmptyResult from "@/components/shared/tables/TableEmptyResult.vue";
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import type { PhysicalCondition } from "../interfaces";
import usePhysicalCondition from "../composables/UsePhysicalConditionStore";
import { handleSortChange } from "@/modules/shared/utilities/UseModelSortHandler";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { useRouter } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ physicalConditions: PhysicalCondition[]; isLoading: boolean }>();

const route = useRouter();
const { can, deletePhysicalCondition } = usePhysicalCondition();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the physical condition details.
 * @param {PhysicalCondition} physicalCondition
 * @returns {void}
 */
const handleLoadPhysicalCondition = (physicalCondition: PhysicalCondition): void => {
  route.push({
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
  route.push({
    name: "physical-conditions-saving",
    params: { id: String(physicalConditionId), tab: "physicalConditionData" },
  });
};

/**
 * @description Handle the deletion of a physical condition.
 */
const handleDeletePhysicalCondition = handleDelete(
  "Are you sure you want to delete this physical condition?",
  "Deleting",
  deletePhysicalCondition
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

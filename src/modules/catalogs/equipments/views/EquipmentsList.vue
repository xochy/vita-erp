<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching equipments."
  />

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
    @load-item="handleLoadEquipment"
    @edit-item="handleEditEquipment"
    empty-message="No equipment found."
    router-name-for-saving="equipments-saving"
    main-column-attribute-path="attributes.name"
  >
    <template #options>
      <el-row class="mb-5">
        <el-col :span="6">
          <TableSearcher @search="setSearchBy" />
        </el-col>
      </el-row>
    </template>
    <template #columns>
      </template>
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
  </GenericTable>
</template>

<script setup lang="ts">
import GenericTable from "@/components/shared/tables/GenericTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import type { Equipment } from "../interfaces/equipment";
import { useEquipment } from "../composables/UseEquipmentStore";
import { useEquipments } from "../composables/UseEquipmentsStore";
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
} = useEquipments(FIELDS_SET);

const { can, destroy } = useEquipment();

const router = useRouter();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the equipment details.
 * @param {Equipment} equipment
 * @returns {void}
 */
const handleLoadEquipment = (equipment: Equipment): void => {
  router.push({
    name: "equipments-saving",
    params: { id: String(equipment.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a equipment.
 * @param {number} equipmentId
 * @returns {void}
 */
const handleEditEquipment = (equipmentId: number): void => {
  router.push({
    name: "equipments-saving",
    params: { id: String(equipmentId), tab: "equipmentData" }, // 'equipmentData' is specific here
  });
};
</script>
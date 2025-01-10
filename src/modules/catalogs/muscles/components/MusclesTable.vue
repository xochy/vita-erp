<template>
  <el-table v-loading="isLoading" :data="muscles" style="width: 100%" height="480">
    <el-table-column fixed type="expand" align="left">
      <template #default="props">
        <TranslationsList :path="props.row.relationships.translations.links.related" />
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template #default="props">
        <el-link @click="handleLoadMuscle(props.row)">{{
          props.row.attributes.name
        }}</el-link>
      </template>
    </el-table-column>
    <el-table-column prop="attributes.description" label="Description" width="960" />
    <el-table-column fixed="right" label="Operations" align="right" min-width="120">
      <template #default="props">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleEditMuscle(props.row.id)"
          >Edit</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleDeleteMuscle(props.row.id)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import TranslationsList from "@/modules/shared/translations/views/TranslationsList.vue";
import type { Muscle } from "../interfaces";
import useMuscle from "../composables/UseMuscleStore";
import { useRouter } from "vue-router";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ muscles: Muscle[]; isLoading: boolean }>();

const route = useRouter();
const { deleteMuscle } = useMuscle();
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
</script>

<style scoped>
.el-link {
  cursor: pointer;
  font-size: 13px;
}
</style>

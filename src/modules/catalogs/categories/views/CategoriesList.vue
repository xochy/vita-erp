<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching categories."
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
    @load-item="handleLoadCategory"
    @edit-item="handleEditCategory"
    empty-message="No category found."
    router-name-for-saving="categories-saving"
    main-column-attribute-path="attributes.name"
  >
    <template #options>
      <el-row class="mb-5">
        <el-col :span="6">
          <TableSearcher @search="setSearchBy" />
        </el-col>
      </el-row>
    </template>
    <template #columns> </template>
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
import type { Category } from "../interfaces/category";
import { useCategory } from "../composables/UseCategoryStore";
import { useCategories } from "../composables/UseCategoriesStore";
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
} = useCategories(FIELDS_SET);

const { can, destroy } = useCategory();

const router = useRouter();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the equipment details.
 * @param {Equipment} equipment
 * @returns {void}
 */
const handleLoadCategory = (category: Category): void => {
  router.push({
    name: "categories-saving",
    params: { id: String(category.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a category.
 * @param {number} categoryId
 * @returns {void}
 */
const handleEditCategory = (categoryId: number): void => {
  router.push({
    name: "categories-saving",
    params: { id: String(categoryId), tab: "categoryData" },
  });
};
</script>

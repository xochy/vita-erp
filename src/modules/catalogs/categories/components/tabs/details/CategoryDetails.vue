<template>
  <BasicSkeleton v-if="isLoading" />

  <el-row v-else>
    <el-col :span="24">
      <BasicCard :title="category.attributes.name" :footer="can.destroy">
        <p>{{ category.attributes.description }}</p>
        <template #footer>
          <el-col class="button-col">
            <el-tooltip content="Delete">
              <el-button
                type="danger"
                :icon="Delete"
                @click="handleDeleteCategory(Number(category.id))"
              />
            </el-tooltip>
          </el-col>
        </template>
      </BasicCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import BasicCard from "@/components/shared/cards/BasicCard.vue";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import type { Category } from "@/modules/catalogs/categories/interfaces";
import useCategory from "../../../composables/UseCategoryStore";
import { Delete } from "@element-plus/icons-vue";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ category: Category; isLoading: boolean }>();

const { can, deleteCategory } = useCategory();
const { handleDelete } = useDeleteHandler();

/**
 * @description Handle the deletion of a category.
 */
const handleDeleteCategory = handleDelete(
  "Are you sure you want to delete this category?",
  "Deleting",
  deleteCategory,
  "categories"
);
</script>

<style scoped>
.button-col {
  display: flex;
  justify-content: flex-end;
}
</style>

<template>
  <BasicSkeleton v-if="isLoading" />

  <el-row v-else>
    <el-col :span="24">
      <el-card v-if="!isLoading">
        <el-row>
          <el-col :span="24">
            <h3>{{ category.attributes.name }}</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>{{ category.attributes.description }}</p>
          </el-col>
        </el-row>
        <template #footer v-if="can.destroy">
          <el-row :gutter="24">
            <el-col class="button-col">
              <el-tooltip content="Delete">
                <el-button
                  type="danger"
                  :icon="Delete"
                  @click="handleDeleteCategory(Number(category.id))"
                />
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import type { Category } from "@/modules/catalogs/categories/interfaces";
import useCategory from "../../../composables/UseCategoryStore";
import { Delete } from "@element-plus/icons-vue";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";

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

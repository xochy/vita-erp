<template>
  <el-table-column
    fixed="right"
    label="Actions"
    align="right"
    min-width="120"
    width="240"
  >
    <template #default="props">
      <!-- #region::Edit button -->
      <el-button link type="primary" size="small" @click="handleEdit(props.row.id)">
        Edit
      </el-button>
      <!-- #endregion::Edit button -->

      <!-- #region::Delete button -->
      <el-button link type="primary" size="small" @click="handleDelete(props.row.id)">
        Delete
      </el-button>
      <!-- #endregion::Delete button -->
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
/* -------------------------------- Functions ------------------------------- */

const handleEdit = (id: string) => {
  emit("edit", id);
};

const handleDelete = (id: string) => {
  emit("delete", id);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["edit", "delete"]);
</script>

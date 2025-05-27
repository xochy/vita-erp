<template>
  <el-input
    v-model="search"
    size="small"
    placeholder="Type to search"
    :prefix-icon="Search"
    @keyup.enter="handleSearch"
  />
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";

/* ------------------------------ Refs & Props ------------------------------ */

const search = ref("");

/* -------------------------------- Functions ------------------------------- */

const handleSearch = () => {
  emit("search", search.value);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["search"]);
</script>

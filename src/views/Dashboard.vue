<template>
  <h4>Dashboard</h4>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "main-dashboard",
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>

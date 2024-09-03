<template>
  <CustomAlert
    :content="message"
    :icon-type="'danger'"
    :icon="'cross-square'"
    :title-color="'danger'"
    :title="'Error'"
    :type="'danger'"
  />
</template>

<script setup lang="ts">
import CustomAlert from "@/components/shared/alerts/CustomAlert.vue";
import { ref } from "vue";

const message = ref("An error has occurred");
</script>

<style scoped>

</style>
<template>
  <LoadingAlert v-if="isLoading" />

  <CustomAlert v-else-if="isError"
    :content="error?.message"
    :icon-type="'danger'"
    :icon="'cross-square'"
    :title-color="'danger'"
    :title="'Error'"
    :type="'danger'"
  />

  <div class="table-responsive">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="fw-bold fs-6 text-gray-800">
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="physicalCondition in physicalConditions" :key="physicalCondition.id">
            <td>{{ physicalCondition.attributes.name }}</td>
            <td>{{ physicalCondition.attributes.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePhysicalConditions } from "../composables/UsePhysicalConditions";
import LoadingAlert from "@/components/shared/alerts/LoadingAlert.vue";
import CustomAlert from "@/components/shared/alerts/CustomAlert.vue";

const { physicalConditions, isLoading, isError, error } = usePhysicalConditions();
</script>

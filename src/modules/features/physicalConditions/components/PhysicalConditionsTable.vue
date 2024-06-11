<template>
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
</template>

<script setup lang="ts">
import type { PhysicalCondition } from "../interfaces";

interface Props {
  physicalConditions: PhysicalCondition[];
}

defineProps<Props>();
</script>

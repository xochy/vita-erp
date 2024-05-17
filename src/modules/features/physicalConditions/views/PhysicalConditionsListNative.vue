<template>
  <LoadingAlert v-if="store.physicalConditions.isLoading" />

  <CustomAlert
    v-else-if="store.physicalConditions.hasError"
    :content="store.physicalConditions.errorMessage"
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
          <tr
            v-for="physicalCondition in store.physicalConditions.list"
            :key="physicalCondition.id"
          >
            <td>
              <router-link
                :to="`/physical-conditions/${physicalCondition.id}/${physicalCondition.attributes.slug}`"
              >
                {{ physicalCondition.attributes.name }}
              </router-link>
            </td>
            <td>{{ physicalCondition.attributes.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomAlert from "@/components/shared/alerts/CustomAlert.vue";
import LoadingAlert from "@/components/shared/alerts/LoadingAlert.vue";
import store from "../store/physicalConditions.store";
import { getPhysicalConditions } from "../helpers/GetPhysicalConditions";
import { useQuery } from "@tanstack/vue-query";

useQuery({
  queryKey: ["physicalConditions"],
  queryFn: getPhysicalConditions,
  select: (data) => {
    store.loadedPhysicalConditions(data);
  },
});
</script>

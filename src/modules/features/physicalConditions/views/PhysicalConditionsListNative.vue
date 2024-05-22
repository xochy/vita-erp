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
            <td @mouseenter="prefetchPhysicalCondition(physicalCondition.id)">
              <router-link
                :to="{
                  name: 'physical-condition-details',
                  params: {
                    id: physicalCondition.id,
                    slug: physicalCondition.attributes.slug,
                  },
                }"
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
import store from "../store/PhysicalConditions.store";
import {
  getPhysicalCondition,
  getPhysicalConditions,
} from "../helpers/GetPhysicalConditions";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient();

useQuery({
  queryKey: ["physicalConditions"],
  queryFn: getPhysicalConditions,
  select: (data) => {
    store.loadedPhysicalConditions(data);
  },
});

const prefetchPhysicalCondition = async (id: string) => {
  await queryClient.prefetchQuery({
    queryKey: ["physicalCondition", id],
    queryFn: () => getPhysicalCondition(id),
  });
};
</script>

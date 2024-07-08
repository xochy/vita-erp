<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr class="fw-bold fs-6 text-gray-800">
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="physicalCondition in physicalConditions" :key="physicalCondition.id">
          <td>
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
          <td>
            <div class="d-flex">
              <KTIcon
                icon-name="pencil"
                icon-class="fs-2 text-black mx-1"
                style="cursor: pointer"
                @click="showModal(physicalCondition)"
              />
              <KTIcon
                icon-name="trash"
                icon-class="fs-2 text-black mx-1"
                style="cursor: pointer"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <PhysicalConditionSavingModal ref="PhysicalConditionSavingModalRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PhysicalCondition } from "../interfaces";
import PhysicalConditionSavingModal from "@/modules/features/physicalConditions/components/PhysicalConditionSavingModal.vue";

interface Props {
  physicalConditions: PhysicalCondition[];
}

defineProps<Props>();

// ref to the modal
const PhysicalConditionSavingModalRef = ref<InstanceType<
  typeof PhysicalConditionSavingModal
> | null>(null);

// show the modal
const showModal = (physicalCondition: PhysicalCondition) => {
  PhysicalConditionSavingModalRef.value?.loadPhysicalCondition({ ...physicalCondition });
  PhysicalConditionSavingModalRef.value?.showModal();
};
</script>

<style scoped>
.btn-extra-sm {
  font-size: 0.2rem;
  border-radius: 0.2rem;
}
</style>

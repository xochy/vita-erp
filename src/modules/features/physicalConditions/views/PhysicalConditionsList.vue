<template>
  <LoadingAlert v-if="isLoading" />

  <CustomAlert
    v-else-if="isError"
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

  <ul class="pagination">
    <li
      class="page-item previous"
      :class="{ disabled: currentPage === 1 }"
      @click="currentPage!== 1 && getPage(currentPage - 1)"
    >
      <a href="#" class="page-link"><i class="previous"></i></a>
    </li>
    <li
      v-for="number of totalPageNumbers"
      :key="number"
      class="page-item"
      :class="{ active: currentPage === number }"
      @click="getPage(number)"
    >
      <a href="#" class="page-link">{{ number }}</a>
    </li>
    <li
      class="page-item next"
      :class="{ disabled: currentPage === lastPage }"
      @click="currentPage !== lastPage && getPage(currentPage + 1)"
    >
      <a href="#" class="page-link"><i class="next"></i></a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import LoadingAlert from "@/components/shared/alerts/LoadingAlert.vue";
import CustomAlert from "@/components/shared/alerts/CustomAlert.vue";
import usePhysicalConditions from "../composables/UsePhysicalConditionsStore";

const {
  physicalConditions,
  isLoading,
  isError,
  error,
  getPage,
  currentPage,
  lastPage,
  totalPageNumbers,
} = usePhysicalConditions();
</script>

<template>
  <ul class="pagination">
    <li
      class="page-item previous"
      :class="{ disabled: currentPage === 1 }"
      @click="currentPage !== 1 && getPage(currentPage - 1)"
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
import { computed, toRef } from 'vue';

interface Props {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
  getPage: (page: number) => void;
}

const props = defineProps<Props>();

const total = toRef(props, 'total');
const perPage = toRef(props, 'perPage');

const totalPageNumbers = computed(() =>
      [...new Array(Math.ceil(total.value / perPage.value))].map(
        (_, index) => index + 1
      )
    );

</script>

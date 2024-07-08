import { defineStore } from "pinia";
import { ref } from "vue";
import type { Role } from "../interfaces";

export const useRolesStore = defineStore("roles", () => {
  const currentPage = ref<number>(1);
  const from = ref<number>(1);
  const lastPage = ref<number>(1);
  const perPage = ref<number>(5);
  const to = ref<number>(1);
  const total = ref<number>(1);

  const roles = ref<Role[]>([]);

  return {
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    roles,

    setCurrentPage(page: number) {
      currentPage.value = page;
    },

    setFrom(value: number) {
      from.value = value;
    },

    setLastPage(value: number) {
      lastPage.value = value;
    },

    setPerPage(value: number) {
      perPage.value = value;
    },

    setTo(value: number) {
      to.value = value;
    },

    setTotal(value: number) {
      total.value = value;
    },

    setRoles(value: Role[]) {
      roles.value = value;
    },
  };
});

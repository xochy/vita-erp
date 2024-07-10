import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../interfaces";

export const useUsersStore = defineStore("users", () => {
  const currentPage = ref<number>(1);
  const from = ref<number>(1);
  const lastPage = ref<number>(1);
  const perPage = ref<number>(5);
  const to = ref<number>(1);
  const total = ref<number>(1);

  const users = ref<User[]>([]);

  return {
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    users,

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

    setUsers(value: User[]) {
      users.value = value;
    },
  };
});
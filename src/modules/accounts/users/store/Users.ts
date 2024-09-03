import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../interfaces";

export const useUsersStore = defineStore("users", () => {
  const currentPage = ref<number>(1);
  const perPage = ref<number>(5);
  const total = ref<number>(1);

  const users = ref<User[]>([]);

  return {
    currentPage,
    perPage,
    total,
    users,

    setCurrentPage(page: number) {
      currentPage.value = page;
    },

    setPerPage(value: number) {
      perPage.value = value;
    },

    setTotal(value: number) {
      total.value = value;
    },

    setUsers(value: User[]) {
      users.value = value;
    },
  };
});
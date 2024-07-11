import ApiService from "@/core/services/ApiService";
import type { UsersListResponse } from "../interfaces";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { useUsersStore } from "../store/Users";
import { watch } from "vue";

const getUsers = async (
  pageSize: number,
  pageNumber: number
): Promise<UsersListResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<UsersListResponse>(
    `users?page[size]=${pageSize}&page[number]=${pageNumber}&include=relatedRoles`
  );

  return data;
};

const useUsers = () => {
  const store = useUsersStore();
  const authStore = useAuthStore();
  const { currentPage, from, lastPage, perPage, to, total, users } =
    storeToRefs(store);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users?page[number]=", currentPage],
    queryFn: () => getUsers(perPage.value, currentPage.value),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (usersListResponse) => {
    if (usersListResponse) {
      const { meta, data: users } = usersListResponse;
      const { page } = meta;
      const { currentPage, from, lastPage, perPage, to, total } = page;

      store.setCurrentPage(currentPage);
      store.setFrom(from);
      store.setLastPage(lastPage);
      store.setPerPage(perPage);
      store.setTo(to);
      store.setTotal(total);
      store.setUsers(users);
    }
  });

  return {
    // Properties
    error,
    isError,
    isLoading,

    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    users,

    // Methods
    getPage: store.setCurrentPage,

    // Permissions
    canCreateUsers: authStore.hasPermissionTo("create users"),
  };
};

export default useUsers;
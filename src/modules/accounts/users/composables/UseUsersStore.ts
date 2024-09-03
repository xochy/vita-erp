import ApiService from "@/core/services/ApiService";
import type { UsersListResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { useUsersStore } from "../store/Users";
import { watch } from "vue";

/**
 * @description Fetches a list of users from the API.
 * @param {number} pageSize - The number of users to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @returns {Promise<UsersListResponse>} The list of users.
 * @throws {Error} An error occurred while fetching users.
 */
const getUsers = async (
  pageSize: number,
  pageNumber: number
): Promise<UsersListResponse> => {
  try {
    const { data } = await ApiService.vueInstance.axios.get<UsersListResponse>(
      `users?page[size]=${pageSize}&page[number]=${pageNumber}&include=relatedRoles`
    );
    return data;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: "An error occurred while fetching users.",
      type: "error",
    });
    throw error;
  }
};

/**
 * @description Composable function to fetch and manage users.
 * @returns {Object} An object containing the users and pagination data.
 */
const useUsers = () => {
  const store = useUsersStore();
  const authStore = useAuthStore();
  const { currentPage, perPage, total, users } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users?page[number]=", currentPage],
    queryFn: () => getUsers(perPage.value, currentPage.value),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (usersListResponse) => {
    if (usersListResponse) {
      const { meta, data: users } = usersListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setUsers(users);
    }
  });

  return {
    status: {
      isError,
      isLoading,
    },

    pagination: {
      total,
      perPage,
      currentPage,
    },

    permissions: {
      canCreateUsers: authStore.hasPermissionTo("create users"),
    },

    users,
    getPage: store.setCurrentPage,
  };
};

export default useUsers;

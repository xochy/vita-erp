import ApiService from "@/core/services/ApiService";
import type { RolesListResponse } from "../interfaces";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/vue-query";
import { useRolesStore } from "../store/Roles";
import { watch } from "vue";

const getRoles = async (
  pageSize: number,
  pageNumber: number
): Promise<RolesListResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<RolesListResponse>(
    `roles?page[size]=${pageSize}&page[number]=${pageNumber}`
  );

  return data;
};

const useRoles = () => {
  const store = useRolesStore();
  const authStore = useAuthStore();
  const { currentPage, from, lastPage, perPage, to, total, roles } =
    storeToRefs(store);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["roles?page[number]=", currentPage],
    queryFn: () => getRoles(perPage.value, currentPage.value),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (rolesListResponse) => {
    if (rolesListResponse) {
      const { meta, data: roles } = rolesListResponse;
      const { page } = meta;
      const { currentPage, from, lastPage, perPage, to, total } = page;

      store.setCurrentPage(currentPage);
      store.setFrom(from);
      store.setLastPage(lastPage);
      store.setPerPage(perPage);
      store.setTo(to);
      store.setTotal(total);
      store.setRoles(roles);
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
    roles,

    // Methods
    getPage: store.setCurrentPage,

    // Permissions
    canCreateRoles: authStore.hasPermissionTo("create roles"),
  };
};

export default useRoles;

import ApiService from "@/core/services/ApiService";
import type { RolesFlatListResponse } from "../interfaces";
import { storeToRefs } from "pinia";
import { useQuery } from "@tanstack/vue-query";
import { useRolesFlatStore } from "../store/RolesFlat";
import { watch } from "vue";

const getRolesFlat = async (): Promise<RolesFlatListResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<RolesFlatListResponse>(
    `roles/manage/flatList`
  );

  return data;
};

const useRolesFlat = () => {
  const store = useRolesFlatStore();
  const { rolesFlat } = storeToRefs(store);

  const {
    data,
    isLoading: isLoadingRolesFlat,
    isError,
    error,
  } = useQuery({
    queryKey: ["rolesFlat"],
    queryFn: getRolesFlat,
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (rolesFlatListResponse) => {
    if (rolesFlatListResponse) {
      const { data: rolesFlat } = rolesFlatListResponse;

      store.setRolesFlat(rolesFlat);
    }
  });

  return {
    // Properties
    error,
    isError,
    isLoadingRolesFlat,

    rolesFlat,
  };
};

export default useRolesFlat;
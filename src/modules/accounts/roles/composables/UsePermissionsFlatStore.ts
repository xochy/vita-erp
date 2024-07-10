import ApiService from "@/core/services/ApiService";
import type { PermissionsFlatListResponse } from "../interfaces";
import { storeToRefs } from "pinia";
import { useQuery } from "@tanstack/vue-query";
import { usePermissionsFlatStore } from "../store/PermissionsFlat";
import { watch } from "vue";

const getPermissionsFlat = async (): Promise<PermissionsFlatListResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.get<PermissionsFlatListResponse>(
      `permissions/manage/flatList`
    );

  return data;
};

const usePermissionsFlat = () => {
  const store = usePermissionsFlatStore();
  const { permissionsFlat } = storeToRefs(store);

  const {
    data,
    isLoading: isLoadingPermissionsFlat,
    isError,
    error,
  } = useQuery({
    queryKey: ["permissionsFlat"],
    queryFn: getPermissionsFlat,
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (permissionsFlatListResponse) => {
    if (permissionsFlatListResponse) {
      const { data: permissionsFlat } = permissionsFlatListResponse;

      store.setPermissionsFlat(permissionsFlat);
    }
  });

  return {
    // Properties
    error,
    isError,
    isLoadingPermissionsFlat,

    permissionsFlat,
  };
};

export default usePermissionsFlat;

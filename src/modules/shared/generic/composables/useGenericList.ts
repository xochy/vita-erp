// ==================== COMPOSABLE GENÉRICO PARA LISTAS ====================

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";
import type { BaseModel, GenericCollectionStore } from "../interfaces/generic";
import { GenericApiService } from "../services/GenericApiService";

/**
 * Composable genérico para manejar listas de elementos
 */
export function useGenericList<T extends BaseModel>(
  endpoint: string,
  store: GenericCollectionStore<T>,
  fields: string = ""
) {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const apiService = new GenericApiService<T>(endpoint);

  const { currentPage, perPage, sortBy, searchBy, total, items } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [endpoint, { currentPage, perPage, sortBy, searchBy }],
    queryFn: () =>
      apiService.getList(
        perPage.value,
        currentPage.value,
        sortBy.value,
        searchBy.value,
        fields
      ),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (response) => {
    if (response) {
      const { meta, data: items } = response;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setItems(items);
    }
  });

  const refetch = async () => {
    queryClient.invalidateQueries({
      queryKey: [endpoint],
    });
  };

  // Generate model name for permissions (keep plural, replace hyphens with spaces)
  const modelName = endpoint.replace(/-/g, ' ');

  return {
    status: {
      isError,
      isLoading,
    },

    pagination: {
      total,
      perPage,
      currentPage,
      setSortBy: store.setSortBy,
      setPerPage: store.setPerPage,
      setSearchBy: store.setSearchBy,
      setCurrentPage: store.setCurrentPage,
    },

    can: {
      create: authStore.hasPermissionTo(`create ${modelName}`),
    },

    items,
    refetch,
  };
}
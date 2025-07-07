import { storeToRefs } from "pinia";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";
import type { BaseModel, GenericFlatCollectionStore } from "../interfaces/generic";
import { GenericApiService } from "../services/GenericApiService";

/**
 * Composable genérico para manejar listas de todos los elementos
 */
export function useGenericFlatList<T extends BaseModel>(
  endpoint: string,
  store: GenericFlatCollectionStore<T>,
  fields: string = ""
) {
  const queryClient = useQueryClient();
  const apiService = new GenericApiService<T>(endpoint);

  const { items } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [endpoint],
    queryFn: () => apiService.getAll(fields),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (response) => {
    if (response) {
      store.setItems(response.data);
    }
  });

  const refetch = async () => {
    queryClient.invalidateQueries({
      queryKey: [endpoint],
    });
  };

  return {
    status: {
      isError,
      isLoading,
    },

    items,
    refetch,
  };
}
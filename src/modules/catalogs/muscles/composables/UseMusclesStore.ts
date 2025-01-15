import ApiService from "@/core/services/ApiService";
import type { MusclesListResponse } from "../interfaces";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useMusclesStore } from "../store/Muscles";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";

/**
 * @description Fetches a list of muscles from the API.
 * @param {number} pageSize - The number of muscles to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @returns {Promise<MusclesListResponse>} The list of muscles.
 * @throws {Error} An error occurred while fetching muscles.
 */
const getMuscles = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<MusclesListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      "fields[categories]": fields,
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } =
      await ApiService.vueInstance.axios.get<MusclesListResponse>("muscles", {
        params,
      });

    return data;
  } catch (error) {
    showErrorNotification("An error occurred while fetching muscles.");
    throw error;
  }
};

/**
 * @description Composable function to manage the muscles.
 * @param {string} fields - The fields to fetch for the muscles.
 * @returns {Object} The muscles composable.
 */
const useMuscles = (fields: string): any => {
  const store = useMusclesStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, muscles } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "muscles?page[number]=",
      { currentPage, perPage, sortBy, searchBy },
    ],
    queryFn: () =>
      getMuscles(
        perPage.value,
        currentPage.value,
        sortBy.value,
        searchBy.value,
        fields
      ),
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (musclesListResponse) => {
    if (musclesListResponse) {
      const { meta, data: muscles } = musclesListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setMuscles(muscles);
    }
  });

  const refetchMuscles = async () => {
    queryClient.invalidateQueries({
      queryKey: ["muscles?page[number]="],
    });
  };

  return {
    status: {
      isError,
      isLoading,
    },

    pag: {
      total,
      perPage,
      currentPage,

      getSortBy: store.setSortBy,
      getPerPage: store.setPerPage,
      getSearchBy: store.setSearchBy,
      getPage: store.setCurrentPage,
    },

    permissions: {
      canCreateMuscles: authStore.hasPermissionTo("create muscles"),
    },

    muscles,
    refetchMuscles,
  };
};

export default useMuscles;

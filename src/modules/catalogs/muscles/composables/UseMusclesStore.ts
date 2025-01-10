import ApiService from "@/core/services/ApiService";
import type { MusclesListResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useMusclesStore } from "../store/Muscles";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

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
  fields: string
): Promise<MusclesListResponse> => {
  try {
    const { data } =
      await ApiService.vueInstance.axios.get<MusclesListResponse>("muscles", {
        params: {
          "page[size]": pageSize,
          "page[number]": pageNumber,
          "fields[muscles]": fields,
        },
      });

    return data;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: "An error occurred while fetching muscles.",
      type: "error",
    });
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
  const { currentPage, perPage, total, muscles } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["muscles?page[number]=", currentPage],
    queryFn: () => getMuscles(perPage.value, currentPage.value, fields),
    retry: 3,
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
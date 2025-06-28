import ApiService from "@/core/services/ApiService";
import type { WorkoutsListResponse } from "../interfaces";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useWorkoutsStore } from "../store/Workouts";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of workouts from the API. First, it generates
 * the query parameters and then fetches the workouts from the API.
 * @param {number} pageSize - The number of workouts to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @param {string} sortBy - The field to sort by.
 * @param {string} searchBy - The search query.
 * @returns {Promise<WorkoutsListResponse>} The list of workouts.
 * @throws {Error} An error occurred while fetching workouts.
 */
const getWorkouts = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<WorkoutsListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      ...(fields && { "fields[workouts]": fields }),
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } = await ApiService.vueInstance.axios.get<WorkoutsListResponse>(
      "workouts",
      { params }
    );

    return data;
  } catch (error) {
    showErrorNotification("An error occurred while fetching workouts.");
    throw error;
  }
};

/**
 * @description Composable function to manage the workouts.
 * @param {string} fields - The fields to fetch for the workouts.
 * @returns {Object} The workouts composable.
 */
const useWorkouts = (fields: string = ""): any => {
  const store = useWorkoutsStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, workouts } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
        queryKey: [
          "workouts?page[number]=",
          { currentPage, perPage, sortBy, searchBy },
        ],
        queryFn: () =>
          getWorkouts(
            perPage.value,
            currentPage.value,
            sortBy.value,
            searchBy.value,
            fields
          ),
        retry: 3,
        retryDelay: 1000,
      });

      watch(data, (workoutsListResponse) => {
      if (workoutsListResponse) {
        const { meta, data: workouts } = workoutsListResponse;
        const { page } = meta;
        const { currentPage, perPage, total } = page;

        store.setCurrentPage(currentPage);
        store.setPerPage(perPage);
        store.setTotal(total);
        store.setWorkouts(workouts);
      }
    });

    const refetchWorkouts = async () =>
      queryClient.invalidateQueries({
        queryKey: ["workouts?page[number]="],
      });

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
        canCreateWorkouts: authStore.hasPermissionTo("create workouts"),
      },

      workouts,
      refetchWorkouts,
    };
}

export default useWorkouts;
import ApiService from "@/core/services/ApiService";
import type { PhysicalConditionsListResponse } from "../interfaces";
import { computed, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { usePhysicalConditionsStore } from "../store/PhysicalConditions";
import { storeToRefs } from "pinia";

const getPhysicalConditions = async (
  pageSize: number,
  pageNumber: number
): Promise<PhysicalConditionsListResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.get<PhysicalConditionsListResponse>(
      `physical-conditions?page[size]=${pageSize}&page[number]=${pageNumber}`
    );

  return data;
};

const usePhysicalConditions = () => {
  const store = usePhysicalConditionsStore();
  const {
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    physicalConditions,
  } = storeToRefs(store);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["physical-conditions?page[number]=", currentPage],
    queryFn: () => getPhysicalConditions(perPage.value, currentPage.value),
    // retry: 3,
    // retryDelay: 1000,
  });

  watch(data, (physicalConditionsListResponse) => {
    if (physicalConditionsListResponse) {
      store.setCurrentPage(
        physicalConditionsListResponse.meta.page.currentPage
      );
      store.setFrom(physicalConditionsListResponse.meta.page.from);
      store.setLastPage(physicalConditionsListResponse.meta.page.lastPage);
      store.setPerPage(physicalConditionsListResponse.meta.page.perPage);
      store.setTo(physicalConditionsListResponse.meta.page.to);
      store.setTotal(physicalConditionsListResponse.meta.page.total);
      store.setPhysicalConditions(physicalConditionsListResponse.data);
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
    physicalConditions,

    // Getters

    // Methods
    getPage: store.setCurrentPage,

    // Getters
    totalPageNumbers: computed(() =>
      [...new Array(Math.ceil(total.value / perPage.value))].map(
        (_, index) => index + 1
      )
    ),
  };
};

export default usePhysicalConditions;

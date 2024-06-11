import ApiService from "@/core/services/ApiService";
import type { PhysicalConditionsListResponse } from "../interfaces";
import { watch } from "vue";
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
    retry: 3,
    retryDelay: 1000,
  });

  watch(data, (physicalConditionsListResponse) => {
    if (physicalConditionsListResponse) {
      const { meta, data: physicalConditions } = physicalConditionsListResponse;
      const { page } = meta;
      const { currentPage, from, lastPage, perPage, to, total } = page;

      store.setCurrentPage(currentPage);
      store.setFrom(from);
      store.setLastPage(lastPage);
      store.setPerPage(perPage);
      store.setTo(to);
      store.setTotal(total);
      store.setPhysicalConditions(physicalConditions);
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

    // Methods
    getPage: store.setCurrentPage,
  };
};

export default usePhysicalConditions;

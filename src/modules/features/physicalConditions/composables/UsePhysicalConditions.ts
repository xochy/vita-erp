import { computed } from "vue";
import { getPhysicalConditions } from "../helpers/GetPhysicalConditions";
import { useQuery } from "@tanstack/vue-query";

export const usePhysicalConditions = () => {
  const { data:physicalConditions, isLoading, isError, error } = useQuery(
    { queryKey: ['physicalConditions'], queryFn: getPhysicalConditions},
  );

  return {
    // Properties
    error,
    isError,
    isLoading,
    physicalConditions,

    // Computed
    count: computed(() => physicalConditions.value?.length ?? 0),
  };
};

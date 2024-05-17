import { watchEffect } from "vue";
import { getPhysicalCondition } from "../helpers/GetPhysicalConditions";
import { useQuery } from "@tanstack/vue-query";

/**
 * Physical condition composable for fetching a single physical condition
 * @param id
 * @returns Data and status of the physical condition
 * (isLoading, isError, error, physicalCondition)
 */
export const usePhysicalCondition = (id: string) => {
  const { data: physicalCondition, isLoading, isError, error } = useQuery(
    {
      queryKey: ['physicalCondition'],
      queryFn: () => getPhysicalCondition(id),
      retry: 3,
      retryDelay: 1000,
    },
  );

  watchEffect(() => {});

  return {
    // Properties
    error,
    isError,
    isLoading,
    physicalCondition,
  };
};
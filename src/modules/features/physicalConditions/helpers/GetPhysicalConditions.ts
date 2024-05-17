import ApiService from "@/core/services/ApiService";
import type { PhysicalCondition, PhysicalConditionsListResponse } from "../interfaces";

export const getPhysicalConditions = async (): Promise<PhysicalCondition[]> => {

  const { data } = await ApiService.vueInstance.axios
    .get<PhysicalConditionsListResponse>('physical-conditions?page[size]=10&page[number]=1')

  return data.data;

};
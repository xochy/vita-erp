import ApiService from "@/core/services/ApiService";
import type { PhysicalCondition, PhysicalConditionResponse, PhysicalConditionsListResponse } from "../interfaces";

export const getPhysicalConditions = async (): Promise<PhysicalCondition[]> => {
  const { data } = await ApiService.vueInstance.axios
    .get<PhysicalConditionsListResponse>('physical-conditions?page[size]=10&page[number]=1')

  return data.data;

};

export const getPhysicalCondition = async (id: string): Promise<PhysicalCondition> => {
  const { data } = await ApiService.vueInstance.axios
    .get<PhysicalConditionResponse>(`physical-conditions/${id}`);

  return data.data;
};
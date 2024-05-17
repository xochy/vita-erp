import { computed, onMounted, ref } from "vue";
import type { PhysicalCondition } from "../interfaces";
import { getPhysicalConditions } from "../helpers/GetPhysicalConditions";

export const usePhysicalConditions = () => {
  const physicalConditions = ref<PhysicalCondition[]>([]);
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    physicalConditions.value = await getPhysicalConditions();
    isLoading.value = false;
  });

  // getPhysicalConditions().then((data) => {
  //   physicalConditions.value = data;
  //   isLoading.value = false;
  // });

  // const loadPhysicalConditions = async () => {
  //   physicalConditions.value = await getPhysicalConditions();
  //   isLoading.value = false;
  // }

  return {
    physicalConditions,
    isLoading,
    count: computed(() => physicalConditions.value.length),
  };
};

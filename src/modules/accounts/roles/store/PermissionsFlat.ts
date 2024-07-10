import { defineStore } from "pinia";
import { ref } from "vue";
import type { PermissionFlat } from "../interfaces";

export const usePermissionsFlatStore = defineStore("permissionsFlat", () => {
  const permissionsFlat = ref<PermissionFlat[]>([]);

  return {
    permissionsFlat,

    setPermissionsFlat(value: PermissionFlat[]) {
      permissionsFlat.value = value;
    },
  };
});
import { defineStore } from "pinia";
import { ref } from "vue";
import type { RoleFlat } from "../interfaces";

export const useRolesFlatStore = defineStore("rolesFlat", () => {
  const rolesFlat = ref<RoleFlat[]>([]);

  return {
    rolesFlat,

    setRolesFlat(value: RoleFlat[]) {
      rolesFlat.value = value;
    },
  };
});
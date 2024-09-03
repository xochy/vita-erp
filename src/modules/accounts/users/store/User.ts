import { defineStore } from "pinia";
import { ref } from "vue";
import type { RoleFlat, User } from "../interfaces";
import type { RelatedRole } from "../interfaces/User";
import useRolesFlat from "../composables/UseRolesFlatStore";

/**
 * @description Initialize a new user object
 * @returns {User}
 */
const initializeUser = (): User => ({
  id: "",
  type: "users",
  attributes: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  relationships: {
    roles: {
      data: [],
    },
  },
});

/**
 * @description Extract related roles ids from selected user
 * @param {User} selectedUser
 * @returns {string[]}
 */
const extractRelatedRolesIds = (selectedUser: User): string[] => {
  return (
    selectedUser.relationships?.relatedRoles?.data?.map(
      (role: RelatedRole) => role.id
    ) || []
  );
};

/**
 * @description Filter user roles flat
 * @param {RoleFlat[]} rolesFlat
 * @param {string[]} relatedRolesIds
 * @returns {RoleFlat[]}
 */
const filterUserRolesFlat = (
  rolesFlat: RoleFlat[],
  relatedRolesIds: string[]
): RoleFlat[] => {
  return rolesFlat.filter((role) =>
    relatedRolesIds.includes(role.id.toString())
  );
};

/**
 * @description User store
 */
export const useUserStore = defineStore("user", () => {
  const user = ref<User>(initializeUser());
  const { rolesFlat } = useRolesFlat();

  /**
   * @description Set user data and related roles
   * @param {User} selectedUser
   * @returns {void}
   */
  const setUser = (selectedUser: User): void => {
    user.value = JSON.parse(JSON.stringify(selectedUser));

    const relatedRolesIds = extractRelatedRolesIds(selectedUser);
    const userRolesFlat = filterUserRolesFlat(rolesFlat.value, relatedRolesIds);

    user.value.relationships!.roles.data = userRolesFlat;
  };

  /**
   * @description Clear user
   * @returns {void}
   */
  const clearUser = (): void => {
    user.value = initializeUser();
  };

  return {
    user,
    setUser,
    clearUser,
  };
});

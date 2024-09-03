import { Role, RoleLinks } from "./Role";

export interface RoleResponse {
  links: RoleLinks;
  data:  Role;
}
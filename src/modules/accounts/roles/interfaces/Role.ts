import { PermissionFlat } from "./PermissionFlat";

export interface Role {
  type:          string;
  id:            string;
  attributes:    Attributes;
  relationships?: Relationships;
  links?:         RoleLinks;
}

export interface Attributes {
  name:         string;
  display_name: string;
  default?:      number;
}

export interface RoleLinks {
  self: string;
}

export interface Relationships {
  permissions: Permissions;
}

export interface Permissions {
  links?: Links;
  data?: PermissionFlat[];
}

export interface Links {
  related: string;
  self:    string;
}

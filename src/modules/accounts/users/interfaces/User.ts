import type { RoleFlat } from "./RoleFlat";

export interface User {
  type: string;
  id: string;
  attributes: Attributes;
  relationships?: Relationships;
  links?: UserLinks;
}

export interface Attributes {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  emailVerifiedAt?: Date;
  age?: null;
  gender?: null;
  system?: null;
  weight?: null;
  height?: null;
  bmi?: null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}

export interface UserLinks {
  self: string;
}

export interface Relationships {
  plans?: Plans;
  roles: Roles;
  relatedRoles?: RelatedRoles;
  rolesIdentifiers?: string[];
}

export interface Plans {
  links: Links;
}

export interface Roles {
  data?: RoleFlat[];
}

export interface Links {
  related: string;
  self: string;
}

export interface RelatedRoles {
  data?: RelatedRole[];
}

export interface RelatedRole {
  type: string;
  id: string;
}

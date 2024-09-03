import { Role } from "./Role";

export interface RolesListResponse {
  meta:  Meta;
  links: RolesListResponseLinks;
  data:  Role[];
}

export interface RolesListResponseLinks {
  first: string;
  last:  string;
}

export interface Meta {
  page: Page;
}

export interface Page {
  currentPage: number;
  from:        number;
  lastPage:    number;
  perPage:     number;
  to:          number;
  total:       number;
}

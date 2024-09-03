import { User } from "./User";

export interface UsersListResponse {
  meta:  Meta;
  links: UsersListResponseLinks;
  data:  User[];
}

export interface UsersListResponseLinks {
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

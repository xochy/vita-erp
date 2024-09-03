import type { Category } from "./category";

export interface CategoriesListResponse {
  meta : Meta;
  links: CategoriesListResponseLinks;
  data : Category[];
}

export interface CategoriesListResponseLinks {
  first: string;
  last : string;
  prev : string;
}

export interface Meta {
  page: Page;
}

export interface Page {
  currentPage: number;
  from       : number;
  lastPage   : number;
  perPage    : number;
  to         : number;
  total      : number;
}

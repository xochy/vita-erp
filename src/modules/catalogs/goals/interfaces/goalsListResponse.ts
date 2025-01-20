import { Goal } from "./goal";

export interface GoalsListResponse {
  meta : Meta;
  links: GoalsListResponseLinks;
  data : Goal[];
}

export interface GoalsListResponseLinks {
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

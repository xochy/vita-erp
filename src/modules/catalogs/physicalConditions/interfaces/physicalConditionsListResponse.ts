import { PhysicalCondition } from "./physicalCondition";

export interface PhysicalConditionsListResponse {
  meta : Meta;
  links: PhysicalConditionsListResponseLinks;
  data : PhysicalCondition[];
}

export interface PhysicalConditionsListResponseLinks {
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

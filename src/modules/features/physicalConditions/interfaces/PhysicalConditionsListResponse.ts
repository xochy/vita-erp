import type { PhysicalCondition } from "./PhysicalCondition";

export interface PhysicalConditionsListResponse {
  meta:  Meta;
  links: PhysicalConditionsListResponseLinks;
  data:  PhysicalCondition[];
}

export interface PhysicalConditionsListResponseLinks {
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

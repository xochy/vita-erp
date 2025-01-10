import type { Muscle } from "./muscle";

export interface MusclesListResponse {
  meta : Meta;
  links: MusclesListResponseLinks;
  data : Muscle[];
}

export interface MusclesListResponseLinks {
  first: string;
  last:  string;
  next:  string;
  prev:  string;
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

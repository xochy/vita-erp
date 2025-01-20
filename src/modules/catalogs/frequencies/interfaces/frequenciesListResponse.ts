import { Frequency } from "./frequency";

export interface FrequenciesListResponse {
  meta : Meta;
  links: FrequenciesListResponseLinks;
  data : Frequency[];
}

export interface FrequenciesListResponseLinks {
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

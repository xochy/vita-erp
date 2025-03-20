import type { Page } from "@/modules/shared/interfaces/pagination/Page";
import type { Frequency } from "./frequency";

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
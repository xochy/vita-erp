import type { Page } from "@/modules/shared/interfaces/pagination/Page";
import type { Goal } from "./goal";

export interface GoalsListResponse {
  meta : Meta;
  data : Goal[];
}

export interface Meta {
  page: Page;
}
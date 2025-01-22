import { Page } from "@/modules/shared/interfaces/pagination/Page";
import { Goal } from "./goal";

export interface GoalsListResponse {
  meta : Meta;
  data : Goal[];
}

export interface Meta {
  page: Page;
}
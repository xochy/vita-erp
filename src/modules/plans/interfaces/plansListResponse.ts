import { Page } from "@/modules/shared/interfaces/pagination/Page";
import { Plan } from "./plan";

export interface PlansListResponse {
  meta : Meta;
  data : Plan[];
}

export interface Meta {
  page: Page;
}
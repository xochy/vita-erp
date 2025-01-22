import { Page } from "@/modules/shared/interfaces/pagination/Page";
import { PhysicalCondition } from "./physicalCondition";

export interface PhysicalConditionsListResponse {
  meta : Meta;
  data : PhysicalCondition[];
}

export interface Meta {
  page: Page;
}
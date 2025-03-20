import type { Page } from "@/modules/shared/interfaces/pagination/Page";
import type { PhysicalCondition } from "./physicalCondition";

export interface PhysicalConditionsListResponse {
  meta : Meta;
  data : PhysicalCondition[];
}

export interface Meta {
  page: Page;
}
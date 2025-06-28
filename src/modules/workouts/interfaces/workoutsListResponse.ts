import type { Page } from "@/modules/shared/interfaces/pagination/Page";
import type { Workout } from "./workout";

export interface WorkoutsListResponse {
  meta: Meta;
  data: Workout[];
}

export interface Meta {
  page: Page;
}
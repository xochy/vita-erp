import { Page } from "@/modules/shared/interfaces/pagination/Page";
import type { Muscle } from "./muscle";

export interface MusclesListResponse {
  meta : Meta;
  data : Muscle[];
}

export interface Meta {
  page: Page;
}
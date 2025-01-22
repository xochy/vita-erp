import { Page } from "@/modules/shared/interfaces/pagination/Page";
import type { Category } from "./category";

export interface CategoriesListResponse {
  meta : Meta;
  data : Category[];
}

export interface Meta {
  page: Page;
}
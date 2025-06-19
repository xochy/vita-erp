import type { Page } from "@/modules/shared/interfaces/pagination/Page";
import type { Post } from "./post";

export interface PostsListResponse {
  meta: Meta;
  data: Post[];
}

export interface Meta {
  page: Page;
}

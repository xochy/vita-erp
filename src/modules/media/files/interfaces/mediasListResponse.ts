import type { Media, MediasListResponseLinks } from "./media";

export interface MediasListResponse {
  links: MediasListResponseLinks;
  data:  Media[];
}


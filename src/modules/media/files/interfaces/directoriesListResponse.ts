import type { Directory, MediasLinks } from "./directory";

export interface DirectoriesListResponse {
  links: MediasLinks;
  data : Directory[];
}


import type { Media } from "@/modules/media/files/interfaces";

export interface MediasDownload {
  modelId    : string | number;
  modelType  : string;
  medias     : Media[]
  collection?: string;
}

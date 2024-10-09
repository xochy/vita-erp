export interface Media {
  type: string;
  id: string;
  attributes: Attributes;
  links: MediaLinks;
}

export interface Attributes {
  uuid             : string;
  name             : string;
  fielName         : string;
  mimeType         : string;
  type             : string;
  extension        : string;
  humanReadableSize: string;
  size             : number;
  publicUrl        : string;
  createdAt        : Date;
  updatedAt        : Date;
}

export interface MediaLinks {
  self: string;
}

export interface MediasListResponseLinks {
  related: string;
  self: string;
}

export interface Directory {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: DirectoryLinks;
  meta         ?: Meta;
}

export interface Attributes {
  name      : string;
  slug     ?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DirectoryLinks {
  self: string;
}

export interface Relationships {
  parent        ?: Medias;
  subdirectories?: Medias;
  medias        ?: Medias;
}

export interface Medias {
  links: MediasLinks;
}

export interface MediasLinks {
  related: string;
  self   : string;
}

/* ---------------------------------- Media --------------------------------- */

export interface Meta {
  media: Media;
}

export interface Media {
  action: string;
  path  : string;
  data : File[];
}

export interface File {
  filename: string;
  content: string;
}
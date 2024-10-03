export interface Directory {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: DirectoryLinks;
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
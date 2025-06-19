import type { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface Post {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: PostLinks;
}

export interface Attributes {
  title       : string;
  content     : string;
  publisher  ?: string;
  imageUrl   ?: string;
  slug       ?: string;
  publishedAt?: Date;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface PostLinks {
  self: string;
}

export interface Relationships {
  user        ?: ModelLinks;
  medias      ?: ModelLinks;
  comments    ?: ModelLinks;
  translations?: ModelLinks;
}

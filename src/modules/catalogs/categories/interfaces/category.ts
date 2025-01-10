import { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface Category {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: CategoryLinks;
}

export interface Attributes {
  name        : string;
  description : string;
  slug       ?: string;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface CategoryLinks {
  self: string;
}

export interface Relationships {
  workouts    ?: ModelLinks;
  translations?: ModelLinks;
}

import { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface Muscle {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: MuscleLinks;
}

export interface Attributes {
  name        : string;
  description : string;
  slug       ?: string;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface MuscleLinks {
  self: string;
}

export interface Relationships {
  translations?: ModelLinks;
}

import type { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface Frequency {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: FrequencyLinks;
}

export interface Attributes {
  name        : string;
  description : string;
  slug       ?: string;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface FrequencyLinks {
  self: string;
}

export interface Relationships {
  workouts    ?: ModelLinks;
  translations?: ModelLinks;
}

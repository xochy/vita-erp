import type { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface PhysicalCondition {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: PhysicalConditionsLinks;
}

export interface Attributes {
  name        : string;
  description : string;
  slug       ?: string;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface PhysicalConditionsLinks {
  self: string;
}

export interface Relationships {
  workouts    ?: ModelLinks;
  translations?: ModelLinks;
}

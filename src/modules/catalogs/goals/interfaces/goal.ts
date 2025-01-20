import { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface Goal {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: GoalLinks;
}

export interface Attributes {
  name        : string;
  description : string;
  slug       ?: string;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface GoalLinks {
  self: string;
}

export interface Relationships {
  workouts    ?: ModelLinks;
  translations?: ModelLinks;
}

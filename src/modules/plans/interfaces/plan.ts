import { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface Plan {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: PlanLinks;
}

export interface Attributes {
  name        : string;
  slug       ?: string;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface PlanLinks {
  self: string;
}

export interface Relationships {
  goal             ?: ModelLinks;
  frequency        ?: ModelLinks;
  physicalCondition?: ModelLinks;
  users            ?: ModelLinks;
  routines         ?: ModelLinks;
  translations     ?: ModelLinks;
}

export interface PhysicalCondition {
  type:          string;
  id:            string;
  attributes:    Attributes;
  relationships: Relationships;
  links:         PhysicalConditionsLinks;
}

export interface Attributes {
  name:        string;
  description: string;
  slug:        string;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface PhysicalConditionsLinks {
  self: string;
}

export interface Relationships {
  plans:        Plans;
  translations: Plans;
}

export interface Plans {
  links: PlansLinks;
}

export interface PlansLinks {
  related: string;
  self:    string;
}


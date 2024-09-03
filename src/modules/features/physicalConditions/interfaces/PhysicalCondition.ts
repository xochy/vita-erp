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
  plans:        ModelLinks;
  translations: ModelLinks;
}

export interface ModelLinks {
  links: Links;
}

export interface Links {
  related: string;
  self:    string;
}


export interface User {
  type:          string;
  id:            string;
  attributes:    Attributes;
  relationships: Relationships;
  links:         UserLinks;
}

export interface Attributes {
  name:            string;
  email:           string;
  emailVerifiedAt: Date;
  age:             null;
  gender:          null;
  system:          null;
  weight:          null;
  height:          null;
  bmi:             null;
  createdAt:       Date;
  updatedAt:       Date;
  deletedAt:       null;
}

export interface UserLinks {
  self: string;
}

export interface Relationships {
  plans: Plans;
}

export interface Plans {
  links: PlansLinks;
}

export interface PlansLinks {
  related: string;
  self:    string;
}
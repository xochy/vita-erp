export interface Translation {
  type          : string;
  id            : string;
  attributes    : Attributes;
  relationships?: Relationships;
  links        ?: TranslationLinks;
}

export interface Attributes {
  column      : string;
  locale      : string;
  translation : string;
  createdAt  ?: Date;
  updatedAt  ?: Date;
}

export interface TranslationLinks {
  self: string;
}

export interface Relationships {
  translationable: Translationable;
}

export interface Translationable {
  links: TranslationableLinks;
}

export interface TranslationableLinks {
  related: string;
  self:    string;
}
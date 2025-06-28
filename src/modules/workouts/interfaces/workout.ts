import type { ModelLinks } from "@/modules/shared/translations/interfaces";

export interface Workout {
    type          : string;
    id            : string;
    attributes    : Attributes;
    relationships?: Relationships;
    links        ?: DataLinks;
}

export interface Attributes {
    group       : string;
    levels      : string;
    name        : string;
    performance : string;
    comments   ?: string;
    corrections?: string;
    warnings   ?: string;
    imageUrl   ?: string;
    slug       ?: string;
    createdAt  ?: Date;
    updatedAt  ?: Date;
}

export interface DataLinks {
    self: string;
}

export interface Relationships {
    category    : ModelLinks;
    muscles     : ModelLinks;
    equipments  : ModelLinks;
    routines    : ModelLinks;
    translations: ModelLinks;
    variations  : ModelLinks;
    medias      : ModelLinks;
}
import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";
import type {
  ModelData,
  ModelLinks,
  MultipleModelData,
} from "@/modules/shared/translations/interfaces";

export interface Workout extends BaseModel {
  type: "workouts";
  attributes: {
    group      : string;
    levels     : string;
    name       : string;
    performance: string;
  };
  relationships?: Relationships;
}

export interface Relationships {
  // category can by ModelLinks or ModelData
  category    ?: ModelLinks | ModelData;
  muscles     ?: ModelLinks | MultipleModelData;
  equipments  ?: ModelLinks | MultipleModelData;
  routines    ?: ModelLinks;
  translations?: ModelLinks;
  variations  ?: ModelLinks;
  medias      ?: ModelLinks;
}

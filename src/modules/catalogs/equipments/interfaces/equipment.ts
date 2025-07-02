import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";

export interface Equipment extends BaseModel {
  type: "equipments";
  attributes: {
    name: string;
    description: string;
  };
}
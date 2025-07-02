import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";

export interface Goal extends BaseModel {
  type: "goals";
  attributes: {
    name: string;
    description: string;
  };
}

import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";

export interface Frequency extends BaseModel {
  type: "frequencies";
  attributes: {
    name: string;
    description: string;
  };
}

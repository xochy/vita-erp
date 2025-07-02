import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";

export interface Muscle extends BaseModel {
  type: "muscles";
  attributes: {
    name: string;
    description: string;
  };
}

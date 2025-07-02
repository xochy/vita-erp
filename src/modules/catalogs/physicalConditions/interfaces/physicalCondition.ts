import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";

export interface PhysicalCondition extends BaseModel {
  type: "physical-conditions";
  attributes: {
    name: string;
    description: string;
  };
}


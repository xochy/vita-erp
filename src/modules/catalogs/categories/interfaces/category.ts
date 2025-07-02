import type { BaseModel } from "@/modules/shared/generic/interfaces/generic";

export interface Category extends BaseModel {
  type: "categories";
  attributes: {
    name: string;
    description: string;
  };
}

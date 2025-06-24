import type { SexOption } from "./sexOption";
import type { GoalOption } from "./goalOption";
import type { LevelOption } from "./levelOption";
import type { EquipmentOption } from "./equipmentOption";
import type { MuscleOption } from "./muscleOption";

export interface StepperData {
  sex      : SexOption | null;
  age      : number;
  goal     : GoalOption | null;
  level    : LevelOption | null;
  equipment: EquipmentOption[];
  muscles  : MuscleOption[];
}
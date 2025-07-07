import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import type { Workout } from "../interfaces/workout";
import { useGenericItem } from "@/modules/shared/generic/composables/useGenericItem";
import { useWorkoutStore } from "../store/Workout";

export const translationableFields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const useWorkout = () => {
  const store = useWorkoutStore();
  return useGenericItem<Workout>("workouts", store);
};
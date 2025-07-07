import type { Workout } from "../interfaces/workout";
import { useWorkoutsStore } from "../store/Workouts";
import { useGenericList } from "@/modules/shared/generic/composables/useGenericList";

export const useWorkouts = () => {
  const store = useWorkoutsStore();
  return useGenericList<Workout>("workouts", store);
};

// composables/useStepperStore.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { useStepperStore } from "../store/Stepper";
import type { StepperData } from "../interfaces";

export const useStepperQuery = () => {
  const stepperStore = useStepperStore();
  const queryClient = useQueryClient();

  // Query for getting stepper data (could be used for persistence)
  const stepperQuery = useQuery({
    queryKey: ["stepper-data"],
    queryFn: async (): Promise<StepperData> => {
      // Simulate API call - in real app this would fetch from backend
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(stepperStore.getStepperResults());
        }, 100);
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for saving stepper progress
  const saveStepperMutation = useMutation({
    mutationFn: async (data: Partial<StepperData>): Promise<StepperData> => {
      // Simulate API call to save progress
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...stepperStore.stepperData, ...data });
        }, 500);
      });
    },
    onSuccess: (data) => {
      // Update the query cache
      queryClient.setQueryData(["stepper-data"], data);
    },
  });

  // Mutation for generating final results
  const generateResultsMutation = useMutation({
    mutationFn: async (stepperData: StepperData): Promise<any> => {
      // Simulate API call to generate workout/diet plan
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Math.random().toString(36).substring(2, 11),
            stepperData,
            generatedAt: new Date().toISOString(),
            plan: "Generated workout plan based on your preferences",
          });
        }, 2000);
      });
    },
    onSuccess: (data) => {
      // Could cache the generated results
      queryClient.setQueryData(["generated-plan", data.id], data);
    },
  });

  // Helper functions
  const saveProgress = (stepData: Partial<StepperData>) => {
    return saveStepperMutation.mutate(stepData);
  };

  const generatePlan = () => {
    const currentData = stepperStore.getStepperResults();
    return generateResultsMutation.mutate(currentData);
  };

  const invalidateStepperData = () => {
    queryClient.invalidateQueries({ queryKey: ["stepper-data"] });
  };

  return {
    // Queries
    stepperQuery,

    // Mutations
    saveStepperMutation,
    generateResultsMutation,

    // Helper functions
    saveProgress,
    generatePlan,
    invalidateStepperData,

    // Loading states
    isSaving: saveStepperMutation.isPending,
    isGenerating: generateResultsMutation.isPending,

    // Error states
    saveError: saveStepperMutation.error,
    generateError: generateResultsMutation.error,
  };
};

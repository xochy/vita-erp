import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  StepperData,
  SexOption,
  GoalOption,
  LevelOption,
  EquipmentOption,
  MuscleOption,
  StepConfig,
} from "../interfaces";
import { StepperSteps } from "../interfaces/stepperSteps";

export const useStepperStore = defineStore("stepper", () => {
  // State
  const currentStep = ref<number>(1);
  const stepperData = ref<StepperData>({
    sex: null,
    age: 25,
    goal: null,
    level: null,
    equipment: [],
    muscles: [],
  });

  // Options data
  const sexOptions: SexOption[] = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ];

  const goalOptions: GoalOption[] = [
    { id: "lose_weight", name: "Lose Weight" },
    { id: "gain_muscle", name: "Gain Muscle" },
    { id: "gain_strength", name: "Gain Strength" },
  ];

  const levelOptions: LevelOption[] = [
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const equipmentOptions: EquipmentOption[] = [
    { id: "barbell", name: "Barbell" },
    { id: "dumbbells", name: "Dumbbells" },
    { id: "bodyweight", name: "Bodyweight" },
    { id: "machines", name: "Machines" },
    { id: "cables", name: "Cables" },
  ];

  const muscleOptions: MuscleOption[] = [
    { id: "arms", name: "Arms" },
    { id: "biceps", name: "Biceps" },
    { id: "deltoids", name: "Deltoids" },
    { id: "forearms", name: "Forearms" },
    { id: "triceps", name: "Triceps" },
  ];

  // Computed
  const stepConfigs = computed<StepConfig[]>(() => [
    {
      id: StepperSteps.SEX,
      title: "Sex",
      icon: "User",
      isValid: !!stepperData.value.sex,
    },
    {
      id: StepperSteps.AGE,
      title: "Age",
      icon: "Calendar",
      isValid: stepperData.value.age >= 13 && stepperData.value.age <= 100,
    },
    {
      id: StepperSteps.GOAL,
      title: "Goal",
      icon: "Trophy",
      isValid: !!stepperData.value.goal,
    },
    {
      id: StepperSteps.LEVEL,
      title: "Level",
      icon: "Odometer",
      isValid: !!stepperData.value.level,
    },
    {
      id: StepperSteps.EQUIPMENT,
      title: "Equipment",
      icon: "MagicStick",
      isValid: stepperData.value.equipment.length > 0,
    },
    {
      id: StepperSteps.MUSCLES,
      title: "Muscles",
      icon: "View",
      isValid: stepperData.value.muscles.length > 0,
    },
  ]);

  const currentStepConfig = computed(() =>
    stepConfigs.value.find((step) => step.id === currentStep.value)
  );

  const isCurrentStepValid = computed(
    () => currentStepConfig.value?.isValid ?? false
  );

  const canGoNext = computed(
    () => isCurrentStepValid.value && currentStep.value < 6
  );

  const canGoPrevious = computed(() => currentStep.value > 1);

  const isLastStep = computed(() => currentStep.value === 6);

  // Actions
  const nextStep = () => {
    if (canGoNext.value) {
      currentStep.value++;
    }
  };

  const previousStep = () => {
    if (canGoPrevious.value) {
      currentStep.value--;
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 6) {
      currentStep.value = step;
    }
  };

  const setSex = (sex: SexOption) => {
    stepperData.value.sex = sex;
  };

  const setAge = (age: number) => {
    stepperData.value.age = age;
  };

  const setGoal = (goal: GoalOption) => {
    stepperData.value.goal = goal;
  };

  const setLevel = (level: LevelOption) => {
    stepperData.value.level = level;
  };

  const setEquipment = (equipment: EquipmentOption[]) => {
    stepperData.value.equipment = equipment;
  };

  const setMuscles = (muscles: MuscleOption[]) => {
    stepperData.value.muscles = muscles;
  };

  const resetStepper = () => {
    currentStep.value = 1;
    stepperData.value = {
      sex: null,
      age: 25,
      goal: null,
      level: null,
      equipment: [],
      muscles: [],
    };
  };

  const getStepperResults = () => {
    return {
      ...stepperData.value,
    };
  };

  return {
    // State
    currentStep,
    stepperData,

    // Options
    sexOptions,
    goalOptions,
    levelOptions,
    equipmentOptions,
    muscleOptions,

    // Computed
    stepConfigs,
    currentStepConfig,
    isCurrentStepValid,
    canGoNext,
    canGoPrevious,
    isLastStep,

    // Actions
    nextStep,
    previousStep,
    goToStep,
    setSex,
    setAge,
    setGoal,
    setLevel,
    setEquipment,
    setMuscles,
    resetStepper,
    getStepperResults,
  };
});

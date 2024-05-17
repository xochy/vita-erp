import { reactive } from "vue";
import type { PhysicalCondition } from "../interfaces";

interface Store {
  // State
  physicalCondition: {
    data         : PhysicalCondition;
    isLoading    : boolean;
    hasError     : boolean;
    errorMessage?: string;
  };

  // Actions
  starLoadingPhysicalCondition: () => Promise<void>;
  loadedPhysicalCondition: (data: PhysicalCondition) => void;
  loadPhysicalConditionError: (error: string) => void;
}

const store = reactive<Store>({
  // State
  physicalCondition: {
    data        : {} as PhysicalCondition,
    isLoading   : false,
    hasError    : false,
    errorMessage: undefined,
  },

  // Actions
  async starLoadingPhysicalCondition(): Promise<void> {
    this.physicalCondition = {
      ...this.physicalCondition,
      isLoading   : true,
      hasError    : false,
      errorMessage: undefined,
    };
  },

  loadedPhysicalCondition(data: PhysicalCondition): void {
    this.physicalCondition = {
      data,
      isLoading   : false,
      hasError    : false,
      errorMessage: undefined,
    };
  },

  loadPhysicalConditionError(error: string): void {
    this.physicalCondition = {
      ...this.physicalCondition,
      isLoading   : false,
      hasError    : true,
      errorMessage: error,
    };
  },
});

export default store;
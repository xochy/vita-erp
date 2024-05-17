import { reactive } from "vue";
import type { PhysicalCondition } from "../interfaces";

interface Store {
  // State
  physicalConditions: {
    list         : PhysicalCondition[];
    count        : number;
    isLoading    : boolean;
    hasError     : boolean;
    errorMessage?: string;
  };

  // Actions
  starLoadingPhysicalConditions: () => Promise<void>;
  loadedPhysicalConditions: (data: PhysicalCondition[]) => void;
  loadPhysicalConditionsError: (error: string) => void;
}

const store = reactive<Store>({
  // State
  physicalConditions: {
    list        : [],
    count       : 0,
    isLoading   : false,
    hasError    : false,
    errorMessage: undefined,
  },

  // Actions
  async starLoadingPhysicalConditions(): Promise<void> {
    this.physicalConditions = {
      ...this.physicalConditions,
      isLoading   : true,
      hasError    : false,
      errorMessage: undefined,
    };
  },

  loadedPhysicalConditions(data: PhysicalCondition[]): void {
    this.physicalConditions = {
      list        : data,
      count       : data.length,
      isLoading   : false,
      hasError    : false,
      errorMessage: undefined,
    };
  },

  loadPhysicalConditionsError(error: string): void {
    this.physicalConditions = {
      ...this.physicalConditions,
      isLoading   : false,
      hasError    : true,
      errorMessage: error,
    };
  },
});

export default store;

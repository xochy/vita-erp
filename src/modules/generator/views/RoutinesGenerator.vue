<template>
  <!-- Steps Header -->
  <el-steps
    :active="currentStep - 1"
    align-center
    class="stepper-header"
    finish-status="success"
  >
    <el-step
      v-for="step in stepConfigs"
      :key="step.id"
      :title="step.title"
      :icon="getStepIcon(step.icon)"
      :process-status="getStepStatus(step)"
    />
  </el-steps>

  <!-- Step Content -->
  <div class="step-content">
    <el-card class="step-card" shadow="hover">
      <!-- Step 1: Sex Selection -->
      <div v-if="currentStep === 1" class="step-section">
        <div class="step-header">
          <el-icon class="step-icon"><User /></el-icon>
          <h2>Select Your Sex</h2>
          <p>This helps us personalize your recommendations</p>
        </div>

        <el-radio-group
          :model-value="stepperData.sex?.id || ''"
          @update:model-value="handleSexChange"
          class="radio-group"
        >
          <el-radio
            v-for="option in sexOptions"
            :key="option.id"
            :value="option.id"
            size="large"
            class="radio-option"
          >
            {{ option.name }}
          </el-radio>
        </el-radio-group>
      </div>

      <!-- Step 2: Age Selection -->
      <div v-if="currentStep === 2" class="step-section">
        <div class="step-header">
          <el-icon class="step-icon"><Calendar /></el-icon>
          <h2>What's Your Age?</h2>
          <p>Age: {{ stepperData.age }} years old</p>
        </div>

        <div class="slider-container">
          <el-slider
            v-model="stepperData.age"
            :min="13"
            :max="100"
            :step="1"
            show-stops
            show-tooltip
            class="age-slider"
            @input="handleAgeChange"
          />
          <div class="slider-labels">
            <span>13</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <!-- Step 3: Goal Selection -->
      <div v-if="currentStep === 3" class="step-section">
        <div class="step-header">
          <el-icon class="step-icon"><Trophy /></el-icon>
          <h2>What's Your Goal?</h2>
          <p>Choose your primary fitness objective</p>
        </div>

        <el-radio-group
          :model-value="stepperData.goal?.id || ''"
          @update:model-value="handleGoalChange"
          class="radio-group"
        >
          <el-radio
            v-for="option in goalOptions"
            :key="option.id"
            :value="option.id"
            size="large"
            class="radio-option"
          >
            {{ option.name }}
          </el-radio>
        </el-radio-group>
      </div>

      <!-- Step 4: Level Selection -->
      <div v-if="currentStep === 4" class="step-section">
        <div class="step-header">
          <el-icon class="step-icon"><Odometer /></el-icon>
          <h2>What's Your Experience Level?</h2>
          <p>This helps us adjust the difficulty</p>
        </div>

        <el-radio-group
          :model-value="stepperData.level?.id || ''"
          @update:model-value="handleLevelChange"
          class="radio-group"
        >
          <el-radio
            v-for="option in levelOptions"
            :key="option.id"
            :value="option.id"
            size="large"
            class="radio-option"
          >
            {{ option.name }}
          </el-radio>
        </el-radio-group>
      </div>

      <!-- Step 5: Equipment Selection -->
      <div v-if="currentStep === 5" class="step-section">
        <div class="step-header">
          <el-icon class="step-icon"><MagicStick /></el-icon>
          <h2>Available Equipment</h2>
          <p>Select all equipment you have access to</p>
        </div>

        <el-checkbox-group
          :model-value="stepperData.equipment.map((e) => e.id)"
          @update:model-value="handleEquipmentChange"
          class="checkbox-group"
        >
          <el-checkbox
            v-for="option in equipmentOptions"
            :key="option.id"
            :label="option.id"
            size="large"
            class="checkbox-option"
          >
            {{ option.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- Step 6: Muscles Selection -->
      <div v-if="currentStep === 6" class="step-section">
        <div class="step-header">
          <el-icon class="step-icon"><View /></el-icon>
          <h2>Target Muscle Groups</h2>
          <p>Which muscles do you want to focus on?</p>
        </div>

        <el-checkbox-group
          :model-value="stepperData.muscles.map((m) => m.id)"
          @update:model-value="handleMusclesChange"
          class="checkbox-group"
        >
          <el-checkbox
            v-for="option in muscleOptions"
            :key="option.id"
            :label="option.id"
            size="large"
            class="checkbox-option"
          >
            {{ option.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- Results Summary -->
      <div v-if="currentStep === 6" class="results-preview">
        <el-divider>Your Selections</el-divider>
        <div class="results-grid">
          <div class="result-item"><strong>Sex:</strong> {{ stepperData.sex?.name }}</div>
          <div class="result-item"><strong>Age:</strong> {{ stepperData.age }} years</div>
          <div class="result-item">
            <strong>Goal:</strong> {{ stepperData.goal?.name }}
          </div>
          <div class="result-item">
            <strong>Level:</strong> {{ stepperData.level?.name }}
          </div>
          <div class="result-item">
            <strong>Equipment:</strong>
            {{ stepperData.equipment.map((e) => e.name).join(", ") }}
          </div>
          <div class="result-item">
            <strong>Target Muscles:</strong>
            {{ stepperData.muscles.map((m) => m.name).join(", ") }}
          </div>
        </div>
      </div>
    </el-card>
  </div>

  <!-- Navigation Buttons -->
  <div class="navigation-buttons">
    <el-button v-if="canGoPrevious" @click="previousStep" size="large" class="nav-button">
      <el-icon><ArrowLeft /></el-icon>
      Previous
    </el-button>

    <div class="spacer"></div>

    <el-button
      v-if="!isLastStep"
      type="primary"
      @click="nextStep"
      :disabled="!isCurrentStepValid"
      size="large"
      class="nav-button"
    >
      Continue
      <el-icon><ArrowRight /></el-icon>
    </el-button>

    <el-button
      v-if="isLastStep"
      type="success"
      @click="handleGenerate"
      :disabled="!isCurrentStepValid"
      :loading="isGenerating"
      size="large"
      class="nav-button generate-button"
    >
      <el-icon v-if="!isGenerating"><MagicStick /></el-icon>
      {{ isGenerating ? "Generating..." : "Generate Plan" }}
    </el-button>
  </div>

  <!-- Success Dialog -->
  <el-dialog
    v-model="showSuccessDialog"
    title="Plan Generated Successfully!"
    width="500px"
    center
  >
    <div class="success-content">
      <el-icon class="success-icon"><CircleCheck /></el-icon>
      <p>Your personalized fitness plan has been generated based on your preferences!</p>
      <div class="generated-data">
        <h4>Your Configuration:</h4>
        <pre>{{ JSON.stringify(generatedResults, null, 2) }}</pre>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleReset" type="primary"> Start Over </el-button>
      <el-button @click="showSuccessDialog = false"> Close </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ElSteps,
  ElStep,
  ElCard,
  ElRadioGroup,
  ElRadio,
  ElSlider,
  ElCheckboxGroup,
  ElCheckbox,
  ElButton,
  ElIcon,
  ElDivider,
  ElDialog,
  ElMessage,
} from "element-plus";
import {
  User,
  Calendar,
  Trophy,
  Odometer,
  ArrowLeft,
  ArrowRight,
  MagicStick,
  CircleCheck,
  View,
} from "@element-plus/icons-vue";
import { useStepperStore } from "../store/Stepper";
import { useStepperQuery } from "../composables/UseStepperStore";
import { storeToRefs } from "pinia";

// Store and composables
const stepperStore = useStepperStore();
const { generatePlan, isGenerating, generateError } = useStepperQuery();

// Local state
const showSuccessDialog = ref(false);
const generatedResults = ref(null);

// Computed properties from store

const {
  sexOptions,
  goalOptions,
  levelOptions,
  muscleOptions,
  equipmentOptions,
} = stepperStore;

const {
  isCurrentStepValid,
  currentStep,
  stepperData,
  stepConfigs,
  canGoPrevious,
  isLastStep,
} = storeToRefs(stepperStore);

// Methods
const getStepIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    User,
    Calendar,
    Trophy,
    Odometer,
    MagicStick,
    View,
  };
  return icons[iconName] || User;
};

const getStepStatus = (step: any) => {
  if (step.id < currentStep) return "finish";
  if (step.id === currentStep) return "process";
  return "wait";
};

// Type alias for union type used in handlers
type StepperValue = string | number | boolean | undefined;

const handleSexChange = (value: StepperValue) => {
  if (typeof value !== "string") return;
  console.log("handleSexChange", value);
  const option = sexOptions.find((opt) => opt.id === value);
  console.log("Selected option:", option);
  if (option) stepperStore.setSex(option);
};

const handleAgeChange = (value: number | number[]) => {
  // el-slider can emit a number or an array (for range sliders)
  const age = Array.isArray(value) ? value[0] : value;
  stepperStore.setAge(age);
};

const handleGoalChange = (value: StepperValue) => {
  if (typeof value !== "string") return;
  const option = goalOptions.find((opt) => opt.id === value);
  if (option) stepperStore.setGoal(option);
};

const handleLevelChange = (value: StepperValue) => {
  if (typeof value !== "string") return;
  const option = levelOptions.find((opt) => opt.id === value);
  if (option) stepperStore.setLevel(option);
};

const handleEquipmentChange = (values: Array<string | number>) => {
  const selectedOptions = equipmentOptions.filter((opt) => values.includes(opt.id));
  stepperStore.setEquipment(selectedOptions);
};

const handleMusclesChange = (values: Array<string | number>) => {
  const selectedOptions = muscleOptions.filter((opt) => values.includes(opt.id));
  stepperStore.setMuscles(selectedOptions);
};

const nextStep = () => {
  stepperStore.nextStep();
};

const previousStep = () => {
  stepperStore.previousStep();
};

const handleGenerate = async () => {
  try {
    const result = await generatePlan();
    // generatedResults.value = stepperStore.getStepperResults()
    showSuccessDialog.value = true;
    ElMessage.success("Plan generated successfully!");
  } catch (error) {
    ElMessage.error("Failed to generate plan. Please try again.");
  }
};

const handleReset = () => {
  stepperStore.resetStepper();
  showSuccessDialog.value = false;
  generatedResults.value = null;
};
</script>

<style scoped>
.stepper-header {
  margin-bottom: 40px;
}

.step-content {
  margin-bottom: 40px;
}

.step-card {
  min-height: 400px;
}

.step-section {
  padding: 20px;
}

.step-header {
  text-align: center;
  margin-bottom: 40px;
}

.step-icon {
  font-size: 48px;
  color: var(--el-color-primary);
  margin-bottom: 16px;
}

.step-header h2 {
  margin: 0 0 8px 0;
  color: var(--el-text-color-primary);
  font-size: 24px;
  font-weight: 600;
}

.step-header p {
  margin: 0;
  color: var(--el-text-color-regular);
  font-size: 16px;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.radio-option {
  width: 200px;
  height: 48px;
  border: 2px solid var(--el-border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.radio-option:hover {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.radio-option.is-checked {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-8);
}

.slider-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.age-slider {
  margin-bottom: 20px;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  color: var(--el-text-color-regular);
  font-size: 14px;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  justify-items: center;
}

.checkbox-option {
  width: 200px;
  height: 48px;
  border: 2px solid var(--el-border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.checkbox-option:hover {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.checkbox-option.is-checked {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-8);
}

.results-preview {
  margin-top: 40px;
}

.results-grid {
  display: grid;
  gap: 12px;
}

.result-item {
  padding: 12px;
  background-color: var(--el-fill-color-light);
  border-radius: 6px;
  font-size: 14px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.spacer {
  flex: 1;
}

.nav-button {
  min-width: 120px;
}

.generate-button {
  min-width: 160px;
}

.success-content {
  text-align: center;
}

.success-icon {
  font-size: 64px;
  color: var(--el-color-success);
  margin-bottom: 16px;
}

.generated-data {
  margin-top: 20px;
  text-align: left;
}

.generated-data h4 {
  margin-bottom: 10px;
  color: var(--el-text-color-primary);
}

.generated-data pre {
  background-color: var(--el-fill-color-light);
  padding: 16px;
  border-radius: 6px;
  font-size: 12px;
  overflow-x: auto;
  max-height: 200px;
}

/* Responsive design */
@media (max-width: 768px) {
  .fitness-stepper {
    padding: 10px;
  }

  .step-header h2 {
    font-size: 20px;
  }

  .step-icon {
    font-size: 36px;
  }

  .radio-option,
  .checkbox-option {
    width: 100%;
    min-width: 150px;
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }

  .navigation-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .spacer {
    display: none;
  }

  .nav-button,
  .generate-button {
    width: 100%;
  }

  .slider-container {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .step-card {
    min-height: 350px;
  }

  .step-section {
    padding: 15px;
  }

  .results-grid {
    font-size: 13px;
  }

  .generated-data pre {
    font-size: 10px;
    padding: 12px;
  }
}
</style>

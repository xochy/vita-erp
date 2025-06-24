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
    />
  </el-steps>

  <!-- Step Content -->
  <div class="step-content">
    <el-card class="step-card" shadow="hover">
      <component
        :is="currentComponent"
        :stepper-data="stepperData"
        @update="handleUpdate"
      />

      <!-- Results Summary -->
      <div v-if="isLastStep" class="results-preview">
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
import { ref, computed, defineAsyncComponent } from "vue";
import {
  ElSteps,
  ElStep,
  ElCard,
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

// Component mapping
const components = [
  defineAsyncComponent(() => import('../components/steps/SexStep.vue')),
  defineAsyncComponent(() => import('../components/steps/AgeStep.vue')),
  defineAsyncComponent(() => import('../components/steps/GoalStep.vue')),
  defineAsyncComponent(() => import('../components/steps/LevelStep.vue')),
  defineAsyncComponent(() => import('../components/steps/EquipmentStep.vue')),
  defineAsyncComponent(() => import('../components/steps/MusclesStep.vue')),
];

// Store and composables
const stepperStore = useStepperStore();
const { generatePlan, isGenerating } = useStepperQuery();

// Local state
const showSuccessDialog = ref(false);
const generatedResults = ref(null);

const {
  isCurrentStepValid,
  currentStep,
  stepperData,
  stepConfigs,
  canGoPrevious,
  isLastStep,
} = storeToRefs(stepperStore);

// Computed property to get the current step component
const currentComponent = computed(() => {
    const stepIndex = currentStep.value - 1;
    return (stepIndex >= 0 && stepIndex < components.length) ? components[stepIndex] : null;
});

// Methods
const getStepIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    User, Calendar, Trophy, Odometer, MagicStick, View,
  };
  return icons[iconName] || User;
};

const handleUpdate = (payload: { field: string, value: any }) => {
    switch(payload.field) {
        case 'sex':
            stepperStore.setSex(payload.value);
            break;
        case 'age':
            stepperStore.setAge(payload.value);
            break;
        case 'goal':
            stepperStore.setGoal(payload.value);
            break;
        case 'level':
            stepperStore.setLevel(payload.value);
            break;
        case 'equipment':
            stepperStore.setEquipment(payload.value);
            break;
        case 'muscles':
            stepperStore.setMuscles(payload.value);
            break;
    }
}

const nextStep = () => {
  stepperStore.nextStep();
};

const previousStep = () => {
  stepperStore.previousStep();
};

const handleGenerate = async () => {
  // try {
  //   const result = await generatePlan();
  //   generatedResults.value = stepperStore.getStepperResults();
  //   showSuccessDialog.value = true;
  //   ElMessage.success("Plan generated successfully!");
  // } catch (error) {
  //   ElMessage.error("Failed to generate plan. Please try again.");
  // }
};

const handleReset = () => {
  stepperStore.resetStepper();
  showSuccessDialog.value = false;
  generatedResults.value = null;
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/generator/generator-stepper.scss";
</style>

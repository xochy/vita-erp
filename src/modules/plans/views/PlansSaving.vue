<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <el-tab-pane v-if="can.save" label="Data" name="planData">
      <PlanForm @saved="activeName = 'details'" />
    </el-tab-pane>
    <el-tab-pane lazy label="Translations" name="translations"></el-tab-pane>
    <el-tab-pane lazy label="Details" name="details"></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import { ref } from "vue";
import usePlan from "../composables/UsePlanStore";
import PlanForm from "../components/tabs/data/PlanForm.vue";

const activeName = ref("planData");

const {
  can,
  plan,
  getPlan,
  clearPlan,
  status: { isFetching },
} = usePlan();
</script>

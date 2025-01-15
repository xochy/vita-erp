<template>
  <el-card>
    <el-row>
      <el-col :span="24">
        <h3>{{ title }}</h3>
      </el-col>
      <el-col :span="24">
        <slot name="default"></slot>
      </el-col>
    </el-row>
    <template v-if="footer" #footer>
      <slot name="footer"></slot>
    </template>
  </el-card>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  footer?: boolean;
}>();
</script>

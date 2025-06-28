<template>
  <Transition name="el-fade-in-linear">
    <div v-if="isShowingTranslations">
      <br />
      <TranslationsCollapse :translations="translationsData" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TranslationsCollapse from './TranslationsCollapse.vue'

interface Props {
  isShowingTranslations: boolean
  getTranslationsFunction: (column: string) => any
  columnName?: string
}

const props = withDefaults(defineProps<Props>(), {
  columnName: 'description'
})

const translationsData = computed(() => {
  return props.getTranslationsFunction(props.columnName)
})
</script>
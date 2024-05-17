<template>
  <h1>Counter View: {{ counter }}</h1>
  <button class="btn btn-primary" @click="increaseCounter">+1</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "categories-list",
  setup() {
    const counter = ref(0);

    const increaseCounter = () => {
      counter.value++;
    };

    return {
      counter,
      increaseCounter,
    };
  },
});
</script>

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Directory } from "../interfaces";

const initializeDirectory = (): Directory => ({
  id: "",
  type: "directories",
  attributes: {
    name: "",
  },
});

export const useDirectoryStore = defineStore("directory", () => {
  const id = ref<number>(1);
  const uploadPercentage = ref<number>(0);
  const directory = ref<Directory>(initializeDirectory());

  const setId = (value: number): void => {
    id.value = value;
  }

  const setUploadPercentage = (value: number): void => {
    uploadPercentage.value = value;
  }

  const setDirectory = (selectedDirectory: Directory): void => {
    directory.value = JSON.parse(JSON.stringify(selectedDirectory));;
  }

  const clearDirectory = (): void => {
    directory.value = initializeDirectory();
  }

  return {
    id,
    setId,
    directory,
    setDirectory,
    clearDirectory,
    uploadPercentage,
    setUploadPercentage,
  };
});
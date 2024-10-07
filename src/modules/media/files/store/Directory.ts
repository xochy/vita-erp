import { defineStore } from "pinia";
import { reactive, ref } from "vue";
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

  const directory = ref<Directory>(initializeDirectory());
  const editableDirectory = ref<Directory>(initializeDirectory());

  const history = reactive<Directory[]>([]);

  const setId = (value: number): void => {
    id.value = value;
  };

  const setDirectory = (selectedDirectory: Directory): void => {
    directory.value = JSON.parse(JSON.stringify(selectedDirectory));

    const index = history.findIndex((item) => item.id === selectedDirectory.id);
    if (index !== -1) history.splice(index + 1);
    else history.push(JSON.parse(JSON.stringify(selectedDirectory)));
  };

  const setEditableDirectory = (selectedDirectory: Directory): void => {
    editableDirectory.value = JSON.parse(JSON.stringify(selectedDirectory));
  }

  const clearDirectory = (): void => {
    directory.value = initializeDirectory();
    history.length = 0;
  };

  const clearEditableDirectory = (): void => {
    editableDirectory.value = initializeDirectory();
  }

  return {
    id,
    setId,
    directory,
    setDirectory,
    clearDirectory,
    history,

    editableDirectory,
    setEditableDirectory,
    clearEditableDirectory,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Directory } from "../interfaces";

/**
 * @description Defines the directories store.
 */
export const useDirectoriesStore = defineStore("directories", () => {
  const parentId = ref<number>(1);
  const directories = ref<Directory[]>([]);

  return {
    parentId,
    directories,

    setParentId(value: number) {
      parentId.value = value;
    },

    setDirectories(value: Directory[]) {
      directories.value = value;
    },
  };
});
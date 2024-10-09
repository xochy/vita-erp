import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { Directory } from "../interfaces";

/**
 * @description Defines the directories store.
 */
export const useDirectoriesStore = defineStore("directories", () => {
  const parentId = ref<number>(1);
  const directories = reactive<Directory[]>([]);

  return {
    parentId,
    directories,

    setParentId(value: number) {
      parentId.value = value;
    },

    setDirectories(value: Directory[]) {
      directories.splice(0, directories.length, ...value);
    },

    addDirectory(directory: Directory) {
      directories.push(directory);
    },

    updateDirectory(directory: Directory) {
      const index = directories.findIndex((d) => d.id === directory.id);
      directories.splice(index, 1, directory);
    }
  };
});
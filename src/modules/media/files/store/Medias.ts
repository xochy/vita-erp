import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Media } from '../interfaces';

/**
 * @description Defines the medias store.
 */
export const useMediasStore = defineStore('medias', () => {
  const parentId = ref<number>(1);
  const medias = ref<Media[]>([]);

  return {
    medias,
    parentId,

    setMedias(value: Media[]) {
      medias.value = value;
    },

    setParentId(value: number) {
      parentId.value = value;
    },
  };
});
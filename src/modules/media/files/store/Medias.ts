import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { Media } from '../interfaces';

/**
 * @description Defines the medias store.
 */
export const useMediasStore = defineStore('medias', () => {
  const parentId = ref<number>(1);
  const medias = reactive<Media[]>([]);

  return {
    medias,
    parentId,

    setMedias(value: Media[]) {
      medias.splice(0, medias.length, ...value);
    },

    setParentId(value: number) {
      parentId.value = value;
    },

    addMedia(media: Media) {
      medias.push(media);
    }
  };
});
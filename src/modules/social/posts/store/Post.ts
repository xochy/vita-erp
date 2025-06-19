import { defineStore } from "pinia";
import { ref } from "vue";
import type { Post } from "../interfaces";

/**
 * @description Initialize a post object
 * @returns {Post} An empty post object
 */
const initializePost = (): Post => ({
  id: "",
  type: "posts",
  attributes: {
    title: "",
    content: "",
    publishedAt: new Date(),
  },
});

/**
 * @description Store for managing the post state
 * @returns {Object} The post store
 */
export const usePostStore = defineStore("post", () => {
  const post = ref<Post>(initializePost());

  const setPost = (selectedPost: Post): void => {
    post.value = JSON.parse(JSON.stringify(selectedPost));
  };

  const clearPost = (): void => {
    post.value = initializePost();
  };

  return {
    post,
    setPost,
    clearPost,
  };
});

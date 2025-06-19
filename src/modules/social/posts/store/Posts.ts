import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Post } from '../interfaces';

/**
 * @description Defines the posts store.
 * @returns {Object} The posts store.
 */
export const usePostsStore = defineStore('posts', () => {
  const total = ref<number>(1);
  const sortBy = ref<string>('');
  const perPage = ref<number>(9);
  const searchBy = ref<string>('');
  const currentPage = ref<number>(1);

  const posts = ref<Post[]>([]);

  return {
    posts,

    setPosts(value: Post[]) {
      posts.value = value;
    },

    // #region::Pagination
    total,
    sortBy,
    perPage,
    searchBy,
    currentPage,

    setTotal(value: number) {
      total.value = value;
    },

    setSortBy(value: string) {
      sortBy.value = value;
    },

    setPerPage(value: number) {
      perPage.value = value;
    },

    setSearchBy(value: string) {
      searchBy.value = value;
    },

    setCurrentPage(page: number) {
      currentPage.value = page;
    },
    // #endregion::Pagination
  };
});
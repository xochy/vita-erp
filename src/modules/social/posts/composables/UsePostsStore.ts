import ApiService from "@/core/services/ApiService";
import type { PostsListResponse } from "../interfaces";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "../store/Posts";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

/**
 * @description Fetches a list of posts from the API. First, it generates
 * the query parameters and then fetches the posts from the API.
 * @param {number} pageSize - The number of posts to fetch per page.
 * @param {number} pageNumber - The page number to fetch.
 * @param {string} sortBy - The field to sort by.
 * @param {string} searchBy - The search query.
 * @returns {Promise<PostsListResponse>} The list of posts.
 * @throws {Error} An error occurred while fetching posts.
 */
const getPosts = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  searchBy: string,
  fields: string
): Promise<PostsListResponse> => {
  try {
    const params = generateQueryParams({
      "page[size]": pageSize,
      "page[number]": pageNumber,
      "fields[posts]": fields,
      sort: sortBy,
      ...(searchBy && { "filter[search]": searchBy }),
    });

    const { data } = await ApiService.vueInstance.axios.get<PostsListResponse>(
      "posts",
      { params }
    );

    return data;
  } catch (error) {
    showErrorNotification("An error occurred while fetching posts.");
    throw error;
  }
};

/**
 * @description Composable function to manage the posts.
 * @param {string} fields - The fields to fetch for the posts.
 * @returns {Object} The posts composable.
 */
const usePosts = (fields: string): any => {
  const store = usePostsStore();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const { currentPage, perPage, sortBy, searchBy, total, posts } =
    storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
      queryKey: [
        "posts?page[number]=",
        { currentPage, perPage, sortBy, searchBy },
      ],
      queryFn: () =>
        getPosts(
          perPage.value,
          currentPage.value,
          sortBy.value,
          searchBy.value,
          fields
        ),
      retry: 3,
      retryDelay: 1000,
    });

    watch(data, (postsListResponse) => {
    if (postsListResponse) {
      const { meta, data: posts } = postsListResponse;
      const { page } = meta;
      const { currentPage, perPage, total } = page;

      store.setCurrentPage(currentPage);
      store.setPerPage(perPage);
      store.setTotal(total);
      store.setPosts(posts);
    }
  });

  const refetchPosts = async () =>
    queryClient.invalidateQueries({
      queryKey: ["posts?page[number]="],
    });

  return {
    status: {
      isError,
      isLoading,
    },

    pag: {
      total,
      perPage,
      currentPage,

      getSortBy: store.setSortBy,
      getPerPage: store.setPerPage,
      getSearchBy: store.setSearchBy,
      getPage: store.setCurrentPage,
    },

    permissions: {
      canCreatePosts: authStore.hasPermissionTo("create posts"),
    },

    posts,
    refetchPosts,
  };
}

export default usePosts;
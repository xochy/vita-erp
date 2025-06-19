import ApiService from "@/core/services/ApiService";
import type { Post, PostResponse } from "../interfaces";
import { computed } from "vue";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "../store/Post";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/modules/shared/utilities/ShowErrorNotification";

/**
 * @description Fetches a post from the API.
 * @param {number} id - The ID of the post to fetch.
 * @returns {Promise<PostResponse>} The post.
 */
const getPost = async (id: number): Promise<PostResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<PostResponse>(
    `posts/${id}`
  );

  return data;
};

/**
 * @description Creates a new post.
 * @param {Post} post - The post to create.
 * @returns {Promise<PostResponse>} The created post.
 */
const createPost = async (post: Post): Promise<PostResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<PostResponse>(
    "/posts",
    {
      data: {
        type: "posts",
        attributes: post.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Updates a post.
 * @param {Post} post - The post to update.
 * @returns {Promise<PostResponse>} The updated post.
 */
const updatePost = async (post: Post): Promise<PostResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<PostResponse>(
    `/posts/${post.id}`,
    {
      data: {
        type: "posts",
        attributes: post.attributes,
      },
    }
  );

  return data;
};

/**
 * @description Deletes a post.
 * @param {number} id - The ID of the post to delete.
 * @returns {Promise<void>} A promise that resolves when the post is deleted.
 */
const deletePost = async (id: number): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/posts/${id}`);
};

/**
 * @description Composable function to manage the post.
 * @returns {object} The post and the loading state.
 */
const usePost = (): any => {
  const store = usePostStore();
  const authStore = useAuthStore();
  const { post } = storeToRefs(store);
  const queryClient = useQueryClient();

  /**
   * @description Mutation for post fetching.
   */
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: getPost,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      store.setPost(data);
    },
  });

  /**
   * @description Mutation for post creation.
   */
  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createPost,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Post created successfully");
      store.setPost(data);
    },
  });

  /**
   * @description Mutation for post updating.
   */
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updatePost,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: ({ data }) => {
      showSuccessNotification("Post updated successfully");
      store.setPost(data);
    },
  });

  /**
   * @description Mutation for post deletion.
   */
  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deletePost,
    onError: (error) => {
      showErrorNotification(extractErrorDetail(error));
    },
    onSuccess: () => {
      showSuccessNotification("Post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts?page[number]="],
      });
    },
  });

  const isLoading = computed(
    () =>
      isUpdating.value ||
      isFetching.value ||
      isCreating.value ||
      isDeleting.value
  );

  return {
    getPost: fetch,
    createPost: create,
    updatePost: update,
    deletePost: remove,

    status: {
      isFetching,
      isCreating,
      isUpdating,
      isDeleting,
    },

    isLoading,

    post,
    clearPost: store.clearPost,

    can: {
      save:
        authStore.hasPermissionTo("create posts") ||
        authStore.hasPermissionTo("update posts"),

      modify:
        authStore.hasPermissionTo("update posts") ||
        authStore.hasPermissionTo("delete posts"),

      destroy: authStore.hasPermissionTo("delete posts"),
    },
  };
};

export default usePost;

<template>
  <slot name="options"></slot>
  <el-row :gutter="20" class="posts-grid">
    <el-col
      v-for="post in posts"
      :key="post.id"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="8"
      :xl="8"
      class="post-col"
    >
      <PostCard :post="post" />
    </el-col>
  </el-row>
  <slot name="pagination"></slot>
</template>

<script setup lang="ts">
import PostCard from "./PostCard.vue";
import type { Post } from "../interfaces";
import usePost from "../composables/UsePostStore";
import { useDeleteHandler } from "@/modules/shared/utilities/UseModelDeleteHandler";
import { useRouter } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

defineProps<{ posts: Post[]; isLoading: boolean }>();

const route = useRouter();
const { can, deleteMuscle } = usePost();
const { handleDelete } = useDeleteHandler();

/* -------------------------------- Functions ------------------------------- */

/**
 * @description Load the post details.
 * @param {Post} post
 * @returns {void}
 */
const handleLoadPost = (post: Post): void => {
  route.push({
    name: "posts-saving",
    params: { id: String(post.id), tab: "details" },
  });
};

/**
 * @description Handle the editing of a post.
 * @param {number} postId
 * @returns {void}
 */
const handleEditPost = (postId: number): void => {
  route.push({
    name: "posts-saving",
    params: { id: String(postId), tab: "postData" },
  });
};

/**
 * @description Handle the deletion of a post.
 */
const handleDeletePost = handleDelete(
  "Are you sure you want to delete this post?",
  "Deleting",
  deleteMuscle
);

/**
 * @description Handle the sorting of the table.
 * @param {{ prop: string; order: string }} { prop, order }
 */
const handleSortChange = ({ prop, order }: { prop: string; order: string }): void => {
  let sortValue = "";
  if (order === "ascending") {
    sortValue = prop;
  } else if (order === "descending") {
    sortValue = `-${prop}`;
  }
  emit("sort-change", sortValue);
};

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(["sort-change"]);
</script>

<style scoped lang="scss">
@import "@/assets/sass/modules/posts/posts-list-cards.scss";
</style>

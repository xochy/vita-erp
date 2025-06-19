<template>
  <el-result
    v-if="isError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching categories."
  />

  <PostsTable
    v-else
    :is-loading="isLoading"
    :posts="posts"
    @sort-change="getSortBy"
  >
    <template #options>
      <el-row class="mb-5">
        <el-col :span="6">
          <TableSearcher @search="getSearchBy" />
        </el-col>
      </el-row>
    </template>
    <template #pagination>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="perPage"
        class="center-pagination"
        layout="total, sizes, prev, pager, next, jumper"
        size="small"
        :page-sizes="[5, 10, 15, 20]"
        :disabled="isLoading"
        :total="total"
        @size-change="getPerPage"
        @current-change="getPage"
      />
    </template>
  </PostsTable>
</template>

<script setup lang="ts">
import PostsTable from "../components/PostsTable.vue";
import TableSearcher from "@/components/shared/tables/TableSearcher.vue";
import usePosts from "../composables/UsePostsStore";

const FIELDS_SET = "title,content,publisher,imageUrl,publishedAt,translations";

const {
  posts,
  status: { isLoading, isError },
  pag: { currentPage, perPage, total, getPage, getSortBy, getPerPage, getSearchBy },
} = usePosts(FIELDS_SET);
</script>
<template>
  <el-card class="post-card" shadow="hover">
    <!-- Imagen con indicador de carga -->
    <div class="image-container">
      <el-image
        :src="post.attributes.imageUrl"
        :alt="post.attributes.title"
        class="post-image"
        fit="cover"
        :placeholder="'Cargando...'"
      >
        <template #placeholder>
          <div class="image-placeholder">
            <el-icon class="loading-icon">
              <Loading />
            </el-icon>
            <span>Cargando...</span>
          </div>
        </template>
        <template #error>
          <div class="image-error">
            <el-icon>
              <Picture />
            </el-icon>
            <span>Error al cargar</span>
          </div>
        </template>
      </el-image>
    </div>

    <!-- Información del usuario y fecha -->
    <div class="post-header">
      <div class="user-info">
        <el-avatar :size="32" class="user-avatar">
          {{ post.attributes.publisher?.charAt(0).toUpperCase() }}
        </el-avatar>
        <div class="user-details">
          <span class="user-name">{{ post.attributes.publisher }}</span>
          <span class="post-date">{{
            dayjs(post.attributes.publishedAt).fromNow()
          }}</span>
        </div>
      </div>
    </div>

    <!-- Contenido del post -->
    <div class="post-content">
      <h3 class="post-title">{{ post.attributes.title }}</h3>
      <p class="post-excerpt" :title="post.attributes.content">
        {{ post.attributes.content }}
      </p>
    </div>

    <!-- Footer con enlace -->
    <template #footer>
      <div class="post-footer">
        <el-link
          :href="`/posts/${post.id}`"
          type="primary"
          class="see-more-link"
          :underline="false"
        >
          Ver más...
        </el-link>

        <div class="post-actions">
          <el-button
            type="info"
            :icon="ChatDotRound"
            size="small"
            circle
            plain
            @click="handleComments"
            title="Ver comentarios"
          />
          <el-button
            type="primary"
            :icon="Edit"
            size="small"
            circle
            plain
            @click="handleEdit"
            title="Editar post"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            circle
            plain
            @click="handleDelete"
            title="Eliminar post"
          />
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import type { Post } from "../interfaces";
import { Loading, Picture, ChatDotRound, Edit, Delete } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

/* ------------------------------ Props & Refs ------------------------------ */

const props = defineProps<{ post: Post }>();

/* -------------------------------- Functions ------------------------------- */

const handleComments = () => {
  emit('view-comments', props.post)
}

const handleEdit = () => {
  emit('edit', props.post)
}

const handleDelete = () => {
  emit('delete', props.post)
}

/* ---------------------------------- Emits --------------------------------- */

const emit = defineEmits(['edit', 'delete', 'view-comments'])

</script>

<style scoped>
@import "@/assets/sass/modules/posts/post_list_card.scss";
</style>

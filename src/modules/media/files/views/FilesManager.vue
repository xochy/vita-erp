<template>
  <el-result
    v-if="isDirectoriesError || isMediasError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching files."
  />

  <template v-else>
    <Files.FilesNavigator
      class="mb-4"
      :title="directory.attributes.name"
      :history="history"
      :medias-count="medias.length"
      :directories-count="directories.length"
      @change-directory="handleItemSelected"
      @upload-click="$refs.uploaderFileModal!.open()"
    />

    <Files.FilesTable
      :files="combinedList"
      :is-loading="isLoadingDirectories || isLoadingMedias"
      @item-selected="handleItemSelected"
    />

    <Files.UploaderFileModal
      ref="uploaderFileModal"
      :path="path"
      :directory-id="directory.id"
      @add-file="addMedia"
    />
  </template>
</template>

<script setup lang="ts">
import * as Files from "@/modules/media/files/components";
import type { Directory, Media } from "../interfaces";
import useDirectoriesStore from "../composables/UseDirectoriesStore";
import useDirectory from "../composables/UseDirectoryStore";
import useMediasStore from "../composables/UseMediasStore";
import { computed } from "vue";
import { toPascalCase } from "@/helpers/stringUtils";

/* ------------------------------ Props & Refs ------------------------------ */

const { directory, getDirectory, history } = useDirectory();

const {
  medias,
  addMedia,
  getMedias,
  status: { isLoading: isLoadingMedias, isError: isMediasError },
} = useMediasStore();

const {
  directories,
  getDirectories,
  status: { isLoading: isLoadingDirectories, isError: isDirectoriesError },
} = useDirectoriesStore();

/* -------------------------------- Computed -------------------------------- */

const combinedList = computed(() => {
  return [
    ...directories.value.map((directory: Directory) => ({
      ...directory,
      type: "Folder",
    })),
    ...medias.value.map((media: Media) => ({
      ...media,
      type: toPascalCase(media.attributes.type),
    })),
  ];
});

const path = computed(() => {
  return (
    history.value.map((directory: Directory) => directory.attributes.name).join("/") + "/"
  );
});

/* -------------------------------- Functions ------------------------------- */

const handleItemSelected = (item: Directory | Media) => {
  const directoriesTypes = ["Folder", "directories"];

  if (directoriesTypes.includes(item.type)) {
    getDirectory(item.id);
    getDirectories(item.id);
    getMedias(item.id);
  }
};
</script>

<template>
  <el-result
    v-if="isDirectoriesError || isMediasError"
    icon="error"
    title="Error"
    sub-title="An error occurred while fetching files."
  />

  <FilesTable
    v-else
    :files="combinedList"
    :is-loading="isLoadingDirectories || isLoadingMedias"
    @item-selected="handleItemSelected"
  />

  <UploaderFileModal
    :percentage="uploadPercentage"
    @upload-files="handleUploadingFiles"
  />
</template>

<script setup lang="ts">
import FilesTable from "../components/FilesTable.vue";
import UploaderFileModal from "../components/UploaderFileModal.vue";
import type { Directory, Media, Meta, File as RequestFile } from "../interfaces";
import useDirectoriesStore from "../composables/UseDirectoriesStore";
import useDirectory from "../composables/UseDirectoryStore";
import useMediasStore from "../composables/UseMediasStore";
import { computed } from "vue";
import { toPascalCase } from "@/helpers/stringUtils";

/* ------------------------------ Props & Refs ------------------------------ */

const { directory, getDirectory, addMediaToDirectory, uploadPercentage } = useDirectory();

const {
  medias,
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

/* -------------------------------- Functions ------------------------------- */

const handleItemSelected = (item: Directory | Media) => {
  if (item.type === "Folder") {
    getDirectory(item.id);
    getDirectories(item.id);
    getMedias(item.id);
  }
};

const handleUploadingFiles = (files: RequestFile[]) => {
  const meta: Meta = {
    media: {
      action: "store",
      path: "root/",
      data: files,
    },
  };

  directory.value.meta = meta;

  addMediaToDirectory(directory.value);
};
</script>

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
      @create-folder="savingDirectoryModal!.open()"
    />

    <Files.FilesTable
      :files="combinedList"
      :is-loading="isLoadingDirectories || isLoadingMedias"
      @item-selected="handleItemSelected"
      @edit-item="handleEditItem"
      @preview-item="fileViewerModal!.open($event)"
    />

    <Files.SavingDirectoryModal
      ref="savingDirectoryModal"
      @add-directory="addDirectory"
      @update-directory="updateDirectory"
    />

    <Files.UploaderFileModal
      ref="uploaderFileModal"
      :path="path"
      :directory-id="directory.id"
      @add-file="addMedia"
    />

    <Files.FileViewerModal ref="fileViewerModal" />
  </template>
</template>

<script setup lang="ts">
import * as Files from "@/modules/media/files/components";
import type { Directory, Media } from "../interfaces";
import useDirectoriesStore from "../composables/UseDirectoriesStore";
import useDirectory from "../composables/UseDirectoryStore";
import useMediasStore from "../composables/UseMediasStore";
import { computed, ref } from "vue";

/* ------------------------------ Props & Refs ------------------------------ */

const savingDirectoryModal = ref<InstanceType<typeof Files.SavingDirectoryModal> | null>(
  null
);

const fileViewerModal = ref<InstanceType<typeof Files.FileViewerModal> | null>(null);

const { directory, getDirectory, history, setEditableDirectory } = useDirectory();

const {
  medias,
  addMedia,
  getMedias,
  status: { isLoading: isLoadingMedias, isError: isMediasError },
} = useMediasStore();

const {
  directories,
  addDirectory,
  getDirectories,
  updateDirectory,
  status: { isLoading: isLoadingDirectories, isError: isDirectoriesError },
} = useDirectoriesStore();

/* -------------------------------- Computed -------------------------------- */

const combinedList = computed(() => {
  return [
    ...directories.value.map((directory: Directory) => ({
      ...directory,
      type: "folder",
    })),
    ...medias.value.map((media: Media) => ({
      ...media,
      type: media.attributes.mimeType,
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
  const directoriesTypes = ["folder", "directories"];

  if (directoriesTypes.includes(item.type)) {
    getDirectory(item.id);
    getDirectories(item.id);
    getMedias(item.id);
  }
};

const handleEditItem = (item: Directory | Media) => {
  const directoriesTypes = ["folder", "directories"];

  if (directoriesTypes.includes(item.type)) {
    setEditableDirectory(item);
    savingDirectoryModal.value?.open();
  }
};
</script>

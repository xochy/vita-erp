<template>
  <el-dialog v-model="dialogVisible" width="400" @close="handleOnClose">
    <template #header>
      <h3>Media Viewer</h3>
    </template>
    <div class="media-container" v-if="media">
      <!-- #region::Image -->
      <el-image v-if="isImage" :src="media.attributes.publicUrl" />
      <!-- #endregion::Image -->

      <!-- #region::Video -->
      <video v-else-if="isVideo" ref="videoPlayer" class="video-player" controls autoplay>
        <track src="" kind="subtitles" srclang="en" label="English" />
        <track src="" kind="descriptions" srclang="en" label="English" />
        <source :src="media.attributes.publicUrl" :type="media.attributes.mimeType" />
      </video>
      <!-- #endregion::Video -->

      <!-- #region::Audio -->
      <audio v-else-if="isAudio" ref="audioPlayer" class="audio-player" controls autoplay>
        <source :src="media.attributes.publicUrl" :type="media.attributes.mimeType" />
      </audio>
      <!-- #endregion::Audio -->
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Media } from "../interfaces";

/* ------------------------------ Props & Refs ------------------------------ */

const dialogVisible = ref(false);
const media = ref<Media | null>(null);

const videoPlayer = ref<HTMLVideoElement | null>(null);
const audioPlayer = ref<HTMLAudioElement | null>(null);

/* -------------------------------- Functions ------------------------------- */

const handleOnClose = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
    videoPlayer.value.currentTime = 0;
  }

  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
  }
};

/* -------------------------------- Computed -------------------------------- */

const isImage = computed(() => {
  return media.value?.attributes.mimeType.startsWith("image/");
});

const isVideo = computed(() => {
  return media.value?.attributes.mimeType.startsWith("video/");
});

const isAudio = computed(() => {
  return media.value?.attributes.mimeType.startsWith("audio/");
});

/* --------------------------------- Expose --------------------------------- */

defineExpose({
  open: (item: Media) => {
    media.value = item;

    if (videoPlayer.value) {
      videoPlayer.value.load();
    }

    if (audioPlayer.value) {
      audioPlayer.value.load();
    }

    dialogVisible.value = true;
  },
});
</script>

<style scoped>
.media-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.video-player {
  width: 100%;
  height: auto;
}
</style>

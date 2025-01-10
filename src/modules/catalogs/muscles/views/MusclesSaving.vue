<template>
  <BasicSkeleton v-if="isFetching" />

  <el-tabs v-else v-model="activeName">
    <!-- #region::Tab for muscle form -->
    <el-tab-pane lazy label="Data" name="muscleData">
      <BasicSkeleton v-if="isFetchingMedias || convertingFiles" />
      <MuscleForm v-else :files="files" @saved="handleSaved" />
    </el-tab-pane>
    <!-- #endregion::Tab for muscle form -->

    <!-- #region::Tab for muscle translations -->
    <el-tab-pane lazy label="Translations" name="translations">
      <TranslationsCollapse
        v-if="muscle.relationships?.translations"
        :fields="fields"
        :model-type="'muscles'"
        :model-id="muscle.id"
        :translations-link="muscle.relationships?.translations.links.related"
      />
      <el-empty v-else description="No muscle created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for muscle translations -->

    <!-- #region::Tab for muscle details -->
    <el-tab-pane lazy label="Details" name="details">
      <BasicSkeleton v-if="isFetchingMedias" />
      <MuscleDetails
        v-else-if="muscle.id"
        :muscle="muscle"
        :images="images"
        :isLoading="isFetching"
      />
      <el-empty v-else description="No muscle created." :image-size="100" />
    </el-tab-pane>
    <!-- #endregion::Tab for muscle details -->
  </el-tabs>
</template>

<script setup lang="ts">
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import MuscleDetails from "../components/tabs/details/MuscleDetails.vue";
import MuscleForm from "../components/tabs/data/MuscleForm.vue";
import TranslationsCollapse from "@/modules/shared/translations/components/form/TranslationsCollapse.vue";
import type { Media } from "@/modules/media/files/interfaces";
import type { UploadUserFile } from "element-plus";
import useMedia from "@/modules/shared/media/composables/UseMediaStore";
import useMuscle from "../composables/UseMuscleStore";
import { convertToUploadUserFile } from "@/helpers/MediasUtils";
import { fields } from "../components/tabs/data/fields";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

/* ------------------------------ Props & Refs ------------------------------ */

const activeName = ref("muscleData");
const files = ref<UploadUserFile[]>([]);
const images = ref<Media[]>([]);

const {
  muscle,
  getMuscle,
  clearMuscle,
  status: { isFetching },
} = useMuscle();

const { fetchMedias, isFetching: isFetchingMedias } = useMedia();
const convertingFiles = ref(false);

const route = useRoute();

/* ---------------------------------- Hooks --------------------------------- */

onMounted(() => {
  loadMuscle();
});

onUnmounted(() => {
  clearMuscle();
});

/* -------------------------------- Functions ------------------------------- */

const handleSaved = (medias: Media[]) => {
  images.value = medias;
  activeName.value = "details";
};

/**
 * @description Load the muscle and set the active tab based on the route
 * @returns {void}
 */
const loadMuscle = (): void => {
  const muscleId = route.params.id;
  const activeTab = route.params.tab || "muscleData";

  if (muscleId) {
    getMuscle(muscleId, {
      onSuccess: ({ data }) => {
        fetchMedias(`${data.relationships?.medias.links.related}`, {
          onSuccess: async ({ data }) => {
            images.value = data;

            convertingFiles.value = true;
            files.value = await convertToUploadUserFile(muscleId, data);
            convertingFiles.value = false;
          },
        });
      },
    });
    activeName.value = Array.isArray(activeTab) ? activeTab[0] : activeTab;
  }
};
</script>

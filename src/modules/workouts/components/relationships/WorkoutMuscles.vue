<template>
  <RelationshipLoader
    :related-url="props.relatedUrl"
    query-key="workout-muscles"
    model-type="muscles"
    :fields-set="FIELDS_SET"
  >
    <template #default="{ data }">
      <DetailsWithTranslations
        :items="(data as MusclesListResponse).data"
        :display-config="{
          title: 'name',
          descriptionFields: ['description'],
        }"
      />
    </template>
  </RelationshipLoader>
</template>

<script setup lang="ts">
import RelationshipLoader from "@/modules/shared/generic/RelationshipLoader.vue";
import DetailsWithTranslations from "@/modules/shared/translations/views/DetailsWithTranslations.vue";
import type { MusclesListResponse } from "@/modules/catalogs/muscles/interfaces";

/* ------------------------------ Props y Constantes ----------------------- */

const props = defineProps<{ relatedUrl: string }>();
const FIELDS_SET = "name,description,translations";
</script>
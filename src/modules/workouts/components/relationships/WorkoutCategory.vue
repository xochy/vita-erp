<template>
  <RelationshipLoader
    :related-url="props.relatedUrl"
    query-key="workout-category"
    model-type="categories"
    :fields-set="FIELDS_SET"
  >
    <template #default="{ data }">
      <DetailsWithTranslations
        :items="(data as CategoryResponse).data"
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
import type { CategoryResponse } from "@/modules/catalogs/categories/interfaces";

/* ------------------------------ Props y Constantes ----------------------- */

const props = defineProps<{ relatedUrl: string }>();
const FIELDS_SET = "name,description,createdAt,translations";
</script>
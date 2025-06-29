<template>
  <div v-for="item in normalizedItems" :key="item.id" class="mb-8">
    <InfoItem :label="item.attributes[displayConfig.title]">
      <p
        v-for="field in displayConfig.descriptionFields"
        :key="field"
        class="info-text"
      >
        {{ item.attributes[field] }}
      </p>

      <template #translations>
        <Transition name="el-fade-in-linear">
          <div v-if="isShowingTranslations[item.id]">
            <br />
            <BasicSkeleton v-if="isPendingTranslations[item.id]" />
            <TranslationsCollapse
              v-else-if="translations[item.id]"
              :translations="translations[item.id]()"
            />
          </div>
        </Transition>
      </template>
    </InfoItem>

    <el-switch
      v-if="item.relationships?.translations"
      v-model="isShowingTranslations[item.id]"
      class="mt-5"
      inline-prompt
      active-text="Ocultar traducciones"
      inactive-text="Mostrar traducciones"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import BasicSkeleton from "@/components/shared/skeletons/BasicSkeleton.vue";
import InfoItem from "@/components/shared/cards/InfoItem.vue";
import TranslationsCollapse from "@/components/shared/translations/TranslationsCollapse.vue";
import { useTranslations } from "@/modules/shared/translations/composables/UseTranslations";
import { useTranslationsQuery } from "@/modules/shared/translations/composables/UseTranslationsStore";

/* ------------------------------ Interfaces y Tipos ---------------------- */

// Interfaz genérica para un item con atributos y relaciones
interface GenericItem {
  id: string;
  attributes: Record<string, any>;
  relationships?: {
    translations?: {
      links: {
        related: string;
      };
    };
  };
}

// Configuración para decirle al componente qué atributos mostrar
interface DisplayConfig {
  title: string; // Atributo a usar como título/label principal
  descriptionFields: string[]; // Atributos a mostrar en el cuerpo
}

/* ------------------------------ Props ----------------------------------- */

const props = defineProps<{
  // Puede ser un solo objeto o un arreglo de objetos
  items: GenericItem | GenericItem[];
  // Configuración para mapear los atributos
  displayConfig: DisplayConfig;
}>();

/* ------------------------------ Lógica Central -------------------------- */

const TRANSLATIONS_FIELDS_SET = "column,locale,translation";

// Normaliza la prop 'items' para que siempre sea un arreglo.
// Esto nos permite usar v-for sin preocuparnos si es un solo item o una lista.
const normalizedItems = computed(() =>
  Array.isArray(props.items) ? props.items : [props.items]
);

// Objetos reactivos para manejar el estado de las traducciones de cada item
const isShowingTranslations = reactive<Record<string, boolean>>({});
const isPendingTranslations = reactive<Record<string, boolean>>({});
const translations = reactive<Record<string, () => any>>({});

// Itera sobre los items normalizados para inicializar la lógica de traducciones
normalizedItems.value.forEach((item) => {
  // Solo inicializa si el item tiene una relación de traducción
  if (item.relationships?.translations) {
    isShowingTranslations[item.id] = false;

    // El query de traducciones ahora se activa dinámicamente
    const { data, isPending } = useTranslationsQuery(
      item.relationships.translations.links.related,
      TRANSLATIONS_FIELDS_SET,
      computed(() => isShowingTranslations[item.id]) // Se activa cuando el switch cambia a true
    );

    // Guardamos el estado de carga y los datos para cada item
    isPendingTranslations[item.id] = isPending;
    translations[item.id] = () =>
      useTranslations(data, "es").getAllTranslationsComputed.value();
  }
});
</script>
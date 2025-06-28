import { computed, type Ref } from 'vue';
import type { Translation, TranslationsListResponse } from '../interfaces';
import {
  getTranslationsByColumn,
  getTranslationByColumnAndLocale,
  getAllTranslations,
  getTranslationText,
  getTranslationsTextByColumn,
  groupTranslationsByColumn,
  getAvailableColumns,
  getAvailableLocales
} from '@/helpers/translationsUtils';

/**
 * Composable for working with translations in Vue components
 * Provides reactive computed properties for translation data
 */
export const useTranslations = (
  translationsData: Ref<TranslationsListResponse | null | undefined>,
  defaultLocale: string = 'es'
) => {
  /**
   * Computed property to get translations by column
   * Returns a function that can be called with a column name
   */
  const getTranslationsByColumnComputed = computed(() => {
    return (column: string, locale?: string): Translation[] => {
      return getTranslationsByColumn(translationsData.value, column, locale);
    };
  });

  /**
   * Computed property to get a single translation by column and locale
   */
  const getTranslationComputed = computed(() => {
    return (column: string, locale: string = defaultLocale): Translation | null => {
      return getTranslationByColumnAndLocale(translationsData.value, column, locale);
    };
  });

  /**
   * Computed property to get all translations
   */
  const getAllTranslationsComputed = computed(() => {
    return (): Translation[] => {
      return getAllTranslations(translationsData.value);
    };
  });

  /**
   * Computed property to get translation text by column and locale
   */
  const getTranslationTextComputed = computed(() => {
    return (column: string, locale: string = defaultLocale, fallback: string = ''): string => {
      return getTranslationText(translationsData.value, column, locale, fallback);
    };
  });

  /**
   * Computed property to get all translations text by column
   */
  const getTranslationsTextByColumnComputed = computed(() => {
    return (column: string, fallback: string = ''): string => {
      return getTranslationsTextByColumn(translationsData.value, column, fallback);
    };
  });

  /**
   * Computed property to group all translations by column
   */
  const translationsByColumn = computed(() => {
    return groupTranslationsByColumn(translationsData.value, defaultLocale);
  });

  /**
   * Computed property to get all available columns
   */
  const availableColumns = computed(() => {
    return getAvailableColumns(translationsData.value);
  });

  /**
   * Computed property to get all available locales
   */
  const availableLocales = computed(() => {
    return getAvailableLocales(translationsData.value);
  });

  /**
   * Computed properties for specific columns (commonly used ones)
   */
  const nameTranslations = computed(() =>
    getTranslationsByColumn(translationsData.value, 'name')
  );

  const performanceTranslations = computed(() =>
    getTranslationsByColumn(translationsData.value, 'performance')
  );

  const commentsTranslations = computed(() =>
    getTranslationsByColumn(translationsData.value, 'comments')
  );

  const correctionsTranslations = computed(() =>
    getTranslationsByColumn(translationsData.value, 'corrections')
  );

  const warningsTranslations = computed(() =>
    getTranslationsByColumn(translationsData.value, 'warnings')
  );

  /**
   * Computed properties for specific translation texts in default locale
   */
  const nameText = computed(() =>
    getTranslationText(translationsData.value, 'name', defaultLocale)
  );

  const performanceText = computed(() =>
    getTranslationText(translationsData.value, 'performance', defaultLocale)
  );

  const commentsText = computed(() =>
    getTranslationText(translationsData.value, 'comments', defaultLocale)
  );

  const correctionsText = computed(() =>
    getTranslationText(translationsData.value, 'corrections', defaultLocale)
  );

  const warningsText = computed(() =>
    getTranslationText(translationsData.value, 'warnings', defaultLocale)
  );

  return {
    // Function-based computed properties
    getTranslationsByColumnComputed,
    getTranslationComputed,
    getAllTranslationsComputed,
    getTranslationTextComputed,
    getTranslationsTextByColumnComputed,

    // Grouped data
    translationsByColumn,
    availableColumns,
    availableLocales,

    // Specific column translations
    nameTranslations,
    performanceTranslations,
    commentsTranslations,
    correctionsTranslations,
    warningsTranslations,

    // Specific translation texts
    nameText,
    performanceText,
    commentsText,
    correctionsText,
    warningsText
  };
};
import type { Translation } from "@/modules/shared/translations/interfaces/translation";
import type { TranslationsListResponse } from "@/modules/shared/translations/interfaces/translationsListResponse";

/**
 * Utility function to extract translations by column from API response
 * This function is reusable across components
 *
 * @param apiResponse - The API response containing translations
 * @param column - The column name to filter by (e.g., 'name', 'performance', 'comments')
 * @param locale - Optional locale filter (e.g., 'es', 'en'). If not provided, returns all locales
 * @returns Array of Translation objects matching the criteria
 */
export const getTranslationsByColumn = (
  apiResponse: TranslationsListResponse | null | undefined,
  column: string,
  locale?: string
): Translation[] => {
  // Return empty array if no response or no data
  if (!apiResponse?.data || !Array.isArray(apiResponse.data)) {
    return [];
  }

  return apiResponse.data.filter((translation: Translation) => {
    const matchesColumn = translation.attributes.column === column;
    const matchesLocale = locale
      ? translation.attributes.locale === locale
      : true;

    return matchesColumn && matchesLocale;
  });
};

/**
 * Utility function to get a single translation by column and locale
 * Returns the first match or null if not found
 *
 * @param apiResponse - The API response containing translations
 * @param column - The column name to search for
 * @param locale - The locale to search for (defaults to 'es')
 * @returns Translation object or null if not found
 */
export const getTranslationByColumnAndLocale = (
  apiResponse: TranslationsListResponse | null | undefined,
  column: string,
  locale: string = "es"
): Translation | null => {
  const translations = getTranslationsByColumn(apiResponse, column, locale);
  return translations.length > 0 ? translations[0] : null;
};

/**
 * Utility function to get all translations from API response
 * @param apiResponse - The API response containing translations
 * @returns Array of Translation objects
 */
export const getAllTranslations = (
  apiResponse: TranslationsListResponse | null | undefined
): Translation[] => {
  // Return empty array if no response or no data
  if (!apiResponse?.data || !Array.isArray(apiResponse.data)) {
    return [];
  }

  return apiResponse.data;
};

/**
 * Utility function to extract translation text by column and locale
 * Returns the translation string or fallback text
 *
 * @param apiResponse - The API response containing translations
 * @param column - The column name to search for
 * @param locale - The locale to search for (defaults to 'es')
 * @param fallback - Fallback text if translation not found
 * @returns Translation text or fallback
 */
export const getTranslationText = (
  apiResponse: TranslationsListResponse | null | undefined,
  column: string,
  locale: string = "es",
  fallback: string = ""
): string => {
  const translation = getTranslationByColumnAndLocale(
    apiResponse,
    column,
    locale
  );
  return translation?.attributes.translation ?? fallback;
};

/**
 * Utility function to get all translations text by column
 * Returns a comma-separated string of translations or "No translation" if none found
 *
 * @param apiResponse - The API response containing translations
 * @param column - The column name to search for
 * @returns Comma-separated string of translations or "No translation"
 */
export const getTranslationsTextByColumn = (
  apiResponse: TranslationsListResponse | null | undefined,
  column: string,
  fallback = ""
): string => {
  const translations = getTranslationsByColumn(apiResponse, column);
  return (
    translations
      .map((t) => `(${t.attributes.locale}) ${t.attributes.translation}`)
      .join(", ") || fallback
  );
};

/**
 * Utility function to group translations by column
 * Returns an object with columns as keys and arrays of translations as values
 *
 * @param apiResponse - The API response containing translations
 * @param locale - Optional locale filter
 * @returns Object with columns as keys and Translation arrays as values
 */
export const groupTranslationsByColumn = (
  apiResponse: TranslationsListResponse | null | undefined,
  locale?: string
): Record<string, Translation[]> => {
  if (!apiResponse?.data || !Array.isArray(apiResponse.data)) {
    return {};
  }

  const filteredData = locale
    ? apiResponse.data.filter((t) => t.attributes.locale === locale)
    : apiResponse.data;

  return filteredData.reduce((acc, translation) => {
    const column = translation.attributes.column;
    if (!acc[column]) {
      acc[column] = [];
    }
    acc[column].push(translation);
    return acc;
  }, {} as Record<string, Translation[]>);
};

/**
 * Utility function to get all available columns from translations
 *
 * @param apiResponse - The API response containing translations
 * @returns Array of unique column names
 */
export const getAvailableColumns = (
  apiResponse: TranslationsListResponse | null | undefined
): string[] => {
  if (!apiResponse?.data || !Array.isArray(apiResponse.data)) {
    return [];
  }

  const columns = apiResponse.data.map(
    (translation) => translation.attributes.column
  );
  return [...new Set(columns)];
};

/**
 * Utility function to get all available locales from translations
 *
 * @param apiResponse - The API response containing translations
 * @returns Array of unique locale codes
 */
export const getAvailableLocales = (
  apiResponse: TranslationsListResponse | null | undefined
): string[] => {
  if (!apiResponse?.data || !Array.isArray(apiResponse.data)) {
    return [];
  }

  const locales = apiResponse.data.map(
    (translation) => translation.attributes.locale
  );
  return [...new Set(locales)];
};

import ApiService from "@/core/services/ApiService";
import type { TranslationsListResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { useQuery } from "@tanstack/vue-query";
import { useTranslationsStore } from "../store/Translations";
import { watch } from "vue";
import { storeToRefs } from "pinia";

/**
 * @description Fetches a list of translations from the API.
 * @param {string} path - The path to fetch the translations from.
 * @param {string} fields - The fields to fetch for the translations.
 * @returns {Promise<TranslationsListResponse>} The list of translations.
 * @throws {Error} An error occurred while fetching translations.
 */
const getTranslations = async (
  path: string,
  fields: string
): Promise<TranslationsListResponse> => {
  try {
    const { data } =
      await ApiService.vueInstance.axios.get<TranslationsListResponse>(path, {
        params: {
          "fields[translations]": fields,
        },
      });

    return data;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: "An error occurred while fetching translations.",
      type: "error",
    });
    throw error;
  }
};

/**
 * @description Composable function to manage the translations.
 * @param {string} path - The path to fetch the translations from.
 * @param {string} fields - The fields to fetch for the translations.
 * @param {boolean} saveToStore - Whether to save the translations to the store.
 * @returns {Object} The translations composable.
 */
const useTranslations = (
  path: string,
  fields: string,
  saveToStore: boolean = false
): any => {
  const store = useTranslationsStore();
  const { translations } = storeToRefs(store);

  const { data, isLoading, isError } = useQuery({
    queryKey: [path],
    queryFn: () => getTranslations(path, fields),
    retry: 3,
    retryDelay: 1000,
  });

  if (saveToStore) {
    watch(data, () => {
      if (data.value) {
        store.setTranslations(data.value.data);
      }
    });
  }

  return {
    data,
    isLoading,
    isError,

    translations,
  };
};

export default useTranslations;

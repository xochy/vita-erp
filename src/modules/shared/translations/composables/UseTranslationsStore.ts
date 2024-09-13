import ApiService from "@/core/services/ApiService";
import type { TranslationsListResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useTranslationsStore } from "../store/Translations";
import { storeToRefs } from "pinia";
import { extractErrorDetail } from "@/helpers/errorHelper";

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
 * @description Composable function to manage the translations query.
 * @param {string} path - The path to fetch the translations from.
 * @param {string} fields - The fields to fetch for the translations.
 * @returns {any} The translations query.
 */
const useTranslationsQuery = (path: string, fields: string): any => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["translations", path],
    queryFn: () => getTranslations(path, fields),
    retry: 3,
    retryDelay: 1000,
  });

  return {
    isPending,
    isError,
    data,
  };
};

/**
 * @description Composable function to manage the translations mutation.
 * @param {string} path - The path to fetch the translations from.
 * @param {string} fields - The fields to fetch for the translations.
 * @returns {any} The translations mutation.
 */
const useTranslationsMutation = (path: string, fields: string): any => {
  const store = useTranslationsStore();
  const { translations } = storeToRefs(store);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => getTranslations(path, fields),
    onSuccess: (data) => {
      store.setTranslations(data.data);
    },
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
  });

  return {
    fetch: mutate,
    isPending,
    isError,
    translations,
  };
};

export { useTranslationsQuery, useTranslationsMutation };

import ApiService from "@/core/services/ApiService";
import type { Translation, TranslationResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useTranslationStore } from "../store/Translation";
import { useMutation } from "@tanstack/vue-query";

/**
 * @description Fetches a translation from the API. The translation is identified by its ID.
 * @param {number} id - The ID of the translation to fetch.
 * @returns {Promise<TranslationResponse>} The translation.
 */
const getTranslation = async (id: number): Promise<TranslationResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<TranslationResponse>(
    `translations/${id}`
  );

  return data;
};

/**
 * @description Creates a new translation. For creating a new translation,
 * the translationable data is required (model type and it's id).
 * @param {Translation} translation - The translation to create.
 * @returns {Promise<TranslationResponse>} The created translation.
 */
const createTranslation = async (
  translation: Translation
): Promise<TranslationResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<TranslationResponse>(
    "/translations",
    {
      data: {
        type: "translations",
        attributes: translation.attributes,
        relationships: {
          translationable: {
            data: {
              id: translation.relationships?.translationable?.data?.id,
              type: translation.relationships?.translationable?.data?.type,
            },
          },
        },
      },
    }
  );

  return data;
};

/**
 * @description Updates a translation. The translationable data is not required.
 * @param {Translation} translation - The translation to update.
 * @returns {Promise<TranslationResponse>} The updated translation.
 */
const updateTranslation = async (
  translation: Translation
): Promise<TranslationResponse> => {
  const { data } =
    await ApiService.vueInstance.axios.patch<TranslationResponse>(
      `/translations/${translation.id}`,
      {
        data: {
          type: "translations",
          id: translation.id,
          attributes: translation.attributes,
        },
      }
    );

  return data;
};

/**
 * @description Deletes a translation. The translation is identified by its ID.
 * @param {number} id - The ID of the translation to delete.
 * @returns {Promise<void>} A promise that resolves when the translation is deleted.
 */
const deleteTranslation = async (id: number): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/translations/${id}`);
};

/**
 * @description Composable function to manage the translation.
 * @returns {object} The translation and the loading state.
 */
const useTranslation = (): any => {
  const store = useTranslationStore();
  const { translation } = storeToRefs(store);

  const {
    isPending: isFetching,
    isError: isErrorFetching,
    mutate: fetch,
  } = useMutation({
    mutationFn: getTranslation,
    onSuccess: (data) => {
      store.setTranslation(data.data);
    },
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
  });

  const {
    isPending: isCreating,
    isError: isErrorCreating,
    mutateAsync: createAsync,
  } = useMutation({
    mutationFn: createTranslation,
    onSuccess: (data) => {
      store.setTranslation(data.data);
      ElNotification({
        title: "Success",
        message: "Translation created successfully",
        type: "success",
      });
    },
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
  });

  const {
    isPending: isUpdating,
    isError: isErrorUpdating,
    mutateAsync: updateAsync,
  } = useMutation({
    mutationFn: updateTranslation,
    onSuccess: (data) => {
      store.setTranslation(data.data);
      ElNotification({
        title: "Success",
        message: "Translation updated successfully",
        type: "success",
      });
    },
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
  });

  const {
    isPending: isDeleting,
    isError: isErrorDeleting,
    mutateAsync: removeAsync,
  } = useMutation({
    mutationFn: deleteTranslation,
    onSuccess: () => {
      store.clearTranslation();
      ElNotification({
        title: "Success",
        message: "Translation deleted successfully",
        type: "success",
      });
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
    translation,

    actions: {
      getTranslation: fetch,
      createTranslation: createAsync,
      updateTranslation: updateAsync,
      removeTranslation: removeAsync,
    },
    isErrorUpdating,
    isError:
      isErrorFetching || isErrorCreating || isErrorUpdating || isErrorDeleting,
    isFetching,
    isLoading: isFetching || isCreating || isUpdating || isDeleting,

    locales: store.locales,
    clearTranslation: store.clearTranslation,
  };
};

export default useTranslation;

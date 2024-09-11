import ApiService from "@/core/services/ApiService";
import type { Translation, TranslationResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useTranslationStore } from "../store/Translation";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

/**
 * @description Fetches a translation from the API.
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
 * @description Creates a new translation.
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
      },
    }
  );

  return data;
};

/**
 * @description Updates a translation.
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
 * @description Deletes a translation.
 * @param {Translation} translation - The translation to delete.
 * @returns {Promise<void>} A promise that resolves when the translation is deleted.
 */
const deleteTranslation = async (translation: Translation): Promise<void> => {
  await ApiService.vueInstance.axios.delete(`/translations/${translation.id}`);
};

/**
 * @description Composable function to manage the translation.
 * @returns {object} The translation and the loading state.
 */
const useTranslation = (): any => {
  const store = useTranslationStore();
  const { translation } = storeToRefs(store);
  const router = useRouter();

  const { isPending: isFetching, mutate: fetch } = useMutation({
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

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createTranslation,
    onSuccess: (data) => {
      store.setTranslation(data.data);
      ElNotification({
        title: "Success",
        message: "Translation created successfully",
        type: "success",
      });
      router.push(`/translations/${data.data.id}`);
    },
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
  });

  const { isPending: isUpdating, mutate: update } = useMutation({
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

  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deleteTranslation,
    onSuccess: () => {
      store.clearTranslation();
      ElNotification({
        title: "Success",
        message: "Translation deleted successfully",
        type: "success",
      });
      router.push("/translations");
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
      createTranslation: create,
      updateTranslation: update,
      removeTranslation: remove,
    },

    isLoading: isFetching || isCreating || isUpdating || isDeleting,
  };
};

export default useTranslation;

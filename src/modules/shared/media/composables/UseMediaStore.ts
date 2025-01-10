import ApiService from "@/core/services/ApiService";
import type { MediasListResponse } from "@/modules/media/files/interfaces";
import { ElNotification } from "element-plus";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { useMutation } from "@tanstack/vue-query";

/**
 * @description Fetches a list of medias from the API.
 */
const fetchMedias = async (url): Promise<MediasListResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<MediasListResponse>(
    url
  );

  return data;
};

/**
 * @description Composable function to manage the medias.
 */
const useMedia = (): any => {
  const { isPending: isFetching, mutate: fetch } = useMutation({
    mutationFn: fetchMedias,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
  });

  return {
    fetchMedias: fetch,
    isFetching,
  };
};

export default useMedia;

import ApiService from "@/core/services/ApiService";
import { useQuery } from "@tanstack/vue-query";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import { toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { generateQueryParams } from "../../utilities/QueryParamsGenerator";

/**
 * A generic async function to fetch data from any given API endpoint url.
 * It uses a generic type <T> to represent the expected response shape.
 *
 * @param {string} url - The full URL of the resource to fetch.
 * @param {string} [fields=""] - Optional fields to specify which attributes to include in the response.
 * @returns {Promise<T>} A promise that resolves to the fetched data.
 * @throws Will throw an error if the network request fails.
 */
const getRelationship = async <T>(
  url: string,
  type: string,
  fields: string = ""
): Promise<T> => {
  try {
    const params = generateQueryParams({
      ...(fields && { [`fields[${type}]`]: fields }),
    });

    // The ApiService is configured with a baseURL. To make requests to absolute
    // URLs (like the ones in your 'related' links), we can pass the full URL
    // directly to axios, which will ignore the baseURL.
    const { data } = await ApiService.vueInstance.axios.get<T>(url, { params });
    return data;
  } catch (error) {
    // Show a user-friendly error notification.
    showErrorNotification(`An error occurred while fetching data from ${url}.`);
    // Re-throw the error to be caught by TanStack Query.
    throw error;
  }
};

/**
 * A Vue composable for fetching related data from a JSON:API relationship link.
 *
 * @template T The expected type of the API response (e.g., CategoryResponse or MusclesListResponse).
 * @param {MaybeRefOrGetter<string | undefined>} relationshipUrl - The 'related' URL from the relationships object. Can be a ref, a getter, or a plain string.
 * @param {string} queryKey - A unique string to identify this query in the TanStack Query cache.
 * @returns An object containing the query's state, including data, isLoading, and isError.
 */
export const useRelationship = <T>(
  relationshipUrl: MaybeRefOrGetter<string | undefined>,
  queryKey: string,
  type: string,
  fields: string = "",
  enabled: Ref<boolean> | boolean = true
) => {
  const { data, isLoading, isError, refetch } = useQuery({
    // The query key is an array that uniquely identifies this query.
    // It includes the custom key and the URL to ensure data is cached per-URL.
    queryKey: [queryKey, relationshipUrl],

    // The query function to execute.
    queryFn: () => {
      // We use toValue to get the current value if it's a ref or getter
      const url = toValue(relationshipUrl);
      if (!url) {
        // This should not happen if `enabled` is working correctly, but it's a good safeguard.
        return Promise.reject(new Error("URL is not provided."));
      }
      return getRelationship<T>(url, type, fields);
    },

    // This query will only run if the URL is truthy (i.e., not null or undefined).
    // `toValue` is used here as well to support refs.
    enabled: !!toValue(relationshipUrl) && enabled,

    // Optional: You can configure retry attempts for failed requests.
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

/**
 * @description Extracts the error detail from an error object sended by the API.
 * @param {any} error - The error object.
 * @returns {string} The error detail.
 */
export const extractErrorDetail = (error: any): string => {
  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      return errors[0].detail || "An unknown error occurred.";
    } else if (typeof errors === "object" && errors.detail) {
      return errors.detail;
    }
  }
  return "An unknown error occurred.";
};

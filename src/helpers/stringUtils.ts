// src/helpers/stringUtils.ts

/**
 * Converts a string to camel case.
 * @param {string} str - The string to convert.
 * @returns {string} - The camel case formatted string.
 */
export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
    .replace(/^(.)/, (_, group1) => group1.toLowerCase());
};

/**
 * Converts a string to Pascal case.
 * @param {string} str - The string to convert.
 * @returns {string} - The Pascal case formatted string.
 */
export const toPascalCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/(?:^|[-_])(.)/g, (_, group1) => group1.toUpperCase());
};

/**
 * Converts a string to kebab case.
 * @param {string} str - The string to convert.
 * @returns {string} - The kebab case formatted string.
 */
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
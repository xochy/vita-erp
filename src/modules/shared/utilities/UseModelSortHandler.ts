/**
 * @description Handles sorting logic and emits the sorted value.
 * @param {object} params - Parameters for the sort change.
 * @param {string} params.prop - The property to sort by.
 * @param {string} params.order - The sort order ("ascending" or "descending").
 * @param {Function} emitFn - The Vue emit function.
 */
export const handleSortChange = (
  { prop, order }: { prop: string; order: string },
  emitFn: (event: "sort-change", value: string) => void
): void => {
  let sortValue = "";
  if (order === "ascending") {
    sortValue = prop;
  } else if (order === "descending") {
    sortValue = `-${prop}`;
  }
  emitFn("sort-change", sortValue);
};


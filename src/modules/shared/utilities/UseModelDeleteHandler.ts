import { ElMessageBox, ElMessage } from "element-plus";

/**
 * @description This hook is used to handle delete operations.
 * @returns {object} An object containing the handleDelete function.
 */
export const useDeleteHandler = () => {

  /**
   * @description This function is used to handle delete operation.
   * @param {string} message The message to be displayed in the confirmation dialog.
   * @param {string} title The title of the confirmation dialog.
   * @param {function} deleteCallback The callback function to be called when the user confirms the deletion.
   */
  const handleDelete = (message: string, title: string, deleteCallback: (id: number) => void) => {
    return (itemId: number): void => {
      ElMessageBox.confirm(message, title, {
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          deleteCallback(itemId);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Deleting canceled",
          });
        });
    };
  };

  return { handleDelete };
};

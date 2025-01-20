import { ElNotification } from "element-plus";

export const showErrorNotification = (message: string) => {
  ElNotification({
    title: "Error",
    message,
    type: "error",
  });
};

export const showSuccessNotification = (message: string) => {
  ElNotification({
    title: "Success",
    message,
    type: "success",
  });
};

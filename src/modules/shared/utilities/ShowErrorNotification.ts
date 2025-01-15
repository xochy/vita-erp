import { ElNotification } from "element-plus";

export const showErrorNotification = (message: string) => {
  ElNotification({
    title: "Error",
    message,
    type: "error",
  });
};
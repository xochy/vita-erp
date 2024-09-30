import type { UploadUserFile } from "element-plus";

export const convertFileToBase64 = (file: UploadUserFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.raw!);
    reader.onload = () => {
      const result = reader.result as string;
      if (result.startsWith("data:")) {
        resolve(result.split(",")[1]);
      } else {
        reject(new Error("Invalid Base64 string"));
      }
    };
    reader.onerror = () => reject(new Error("Error while reading file"));
  });
};

import type { UploadRawFile } from "element-plus";
import { ElMessage } from "element-plus";

const mimeTypes = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/3gpp",
  "video/x-msvideo",
  "video/x-flv",
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  "audio/x-ms-wma",
  "audio/x-wav",
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/zip",
];

export const handleBeforeUpload = (rawFile: UploadRawFile): boolean => {
  const isValidMimeType = mimeTypes.includes(rawFile.type);
  const isLessThan1GB = rawFile.size < 1024 * 1024 * 1024;

  if (!isValidMimeType) {
    ElMessage.error("The file must be a valid image, video, audio, or document!");
  }
  if (!isLessThan1GB) {
    ElMessage.error("The file size must be less than 1GB!");
  }

  return isValidMimeType && isLessThan1GB;
};

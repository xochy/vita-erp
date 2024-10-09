import {
  Folder,
  Picture,
  Document,
  Film,
  VideoPlay,
} from "@element-plus/icons-vue";

export const getFileIcon = (type: string) => {
  switch (type) {
    case "image/jpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/gif":
    case "image/webp":
      return Picture;
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/wav":
    case "audio/x-ms-wma":
    case "audio/x-wav":
      return VideoPlay;
    case "video/mp4":
    case "video/quicktime":
    case "video/3gpp":
    case "video/x-msvideo":
    case "video/x-flv":
      return Film;
    case "application/pdf":
    case "application/msword":
    case "application/vnd.ms-excel":
    case "application/vnd.ms-powerpoint":
    case "application/zip":
      return Document;
    default:
      return Folder;
  }
};

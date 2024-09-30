import {
  Folder,
  Picture,
  Document,
  Film,
  Tickets,
} from "@element-plus/icons-vue";

export const getFileIcon = (type: string) => {
  switch (type) {
    case "Folder":
      return Folder;
    case "Image":
    case "Svg":
      return Picture;
    case "video":
      return Film;
    case "Document":
      return Document;
    default:
      return Tickets;
  }
};

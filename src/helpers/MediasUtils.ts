import ApiService from "@/core/services/ApiService";
import type { Media } from "@/modules/media/files/interfaces";
import type { UploadUserFile } from "element-plus";

interface UploadRawFile extends File {
  uid: number;
  bytes: () => Promise<Uint8Array<ArrayBufferLike>>;
}

export const convertToUploadUserFile = async (
  modelId,
  medias: Media[]
): Promise<UploadUserFile[]> => {
  const uploadUserFiles = await Promise.all(
    medias.map(async (media) => {
      const fileContent = await fetchFileContent(
        modelId,
        media.attributes.uuid
      );

      const rawFile = new File(
        [fileContent],
        `${media.attributes.name}.${media.attributes.extension}`,
        { type: media.attributes.mimeType }
      ) as UploadRawFile;

      rawFile.uid = Number(media.id);
      rawFile.bytes = () =>
        fileContent.arrayBuffer().then((buffer) => new Uint8Array(buffer));

      return {
        uid: Number(media.id),
        name: `${media.attributes.name}.${media.attributes.extension}`,
        status: "success" as const,
        size: media.attributes.size,
        url: media.attributes.publicUrl,
        type: media.attributes.mimeType,
        raw: rawFile,
      };
    })
  );

  return uploadUserFiles;
};

const fetchFileContent = async (modelId, mediaId): Promise<Blob> => {
  const response = await ApiService.vueInstance.axios.get(
    `/muscles/download-file/${modelId}/${mediaId}`,
    {
      responseType: "blob",
    }
  );

  return new Blob([response.data]);
};

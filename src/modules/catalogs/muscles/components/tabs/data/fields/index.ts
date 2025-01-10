import NameInput from "./NameInput.vue";
import ImagesUploader from "./ImagesUploader.vue";
import DescriptionInput from "./DescriptionInput.vue";
import type { TranslationableField } from "@/modules/shared/translations/interfaces";

const fields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export { NameInput, ImagesUploader, DescriptionInput, fields };

import type { Muscle } from "../interfaces/muscle";
import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import { useGenericItem } from "@/modules/shared/generic/composables/useGenericItem";
import { useMuscleStore } from "../store/Muscle";

// Configuration for the muscle media files management
const config = {
  hasFileUpload: true,
  fileUploadCollection: "muscles-images",
  messages: {
    created: "Muscle created successfully!",
    updated: "Muscle updated successfully!",
    filesSaved: "Muscle images saved successfully!",
  },
};

// Fields that can be translated for the muscle model
export const translationableFields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const useMuscle = () => {
  const store = useMuscleStore();
  return useGenericItem<Muscle>("muscles", store, config);
};

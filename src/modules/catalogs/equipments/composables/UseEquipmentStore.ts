import type { Equipment } from "../interfaces/equipment";
import type { TranslationableField } from "@/modules/shared/translations/interfaces";
import { useEquipmentStore } from "../store/Equipment";
import { useGenericItem } from "@/modules/shared/generic/composables/useGenericItem";

// Configuration for the equipment media files management
const config = {
  hasFileUpload: true,
  fileUploadCollection: "equipments-images",
  messages: {
    created: "Equipment created successfully!",
    updated: "Equipment updated successfully!",
    filesSaved: "Equipment images saved successfully!",
  },
};

// Fields that can be translated for the equipment model
export const translationableFields: TranslationableField[] = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

// Custom hook to use the equipment store and manage equipment items
export const useEquipment = () => {
  const store = useEquipmentStore();
  return useGenericItem<Equipment>("equipments", store, config);
};

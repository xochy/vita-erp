import { createListStore } from "@/modules/shared/generic/stores/ListStore";
import type { Equipment } from "../interfaces/equipment";

export const useEquipmentsStore = createListStore<Equipment>("equipments");
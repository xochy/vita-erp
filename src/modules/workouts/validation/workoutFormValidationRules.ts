import { ref } from "vue";
import type { FormRules } from "element-plus";
import type { MultipleModelData } from "@/modules/shared/translations/interfaces";

export const rules = ref<FormRules>({
  "attributes.name": [
    {
      required: true,
      message: "Please enter the category name",
      trigger: "blur",
    },
    {
      max: 255,
      message: "Name must be less than 255 characters",
      trigger: "blur",
    },
  ],
  "attributes.performance": [
    {
      required: true,
      message: "Please enter the workout performance",
      trigger: "blur",
    },
    {
      max: 2048,
      message: "Performance must be less than 2048 characters",
      trigger: "blur",
    },
  ],
  "relationships.category": [
    {
      required: true,
      message: "Please select a category",
      trigger: ["change", "blur"],
    },
  ],
  "relationships.muscles": [
    {
      required: true,
      message: "Please select at least one muscle",
      trigger: ["change", "blur"],
      // Custom validator for muscles to ensure a pivot value is selected for each
      validator: (rule: any, value: MultipleModelData, callback: Function) => {
        if (!value?.data?.length) {
          callback(new Error("Please select at least one muscle"));
          return;
        }
        const hasUnselectedPivot = value.data.some(
          (item) =>
            !item.meta?.pivot ||
            Object.keys(item.meta.pivot).length === 0 ||
            Object.values(item.meta.pivot)[0] === null
        );
        if (hasUnselectedPivot) {
          callback(
            new Error("Please select a priority for all selected muscles")
          );
        } else {
          callback();
        }
      },
    },
  ],
  "relationships.equipments": [
    {
      required: true,
      message: "Please select at least one equipment",
      trigger: ["change", "blur"],
    },
  ],
  "attributes.levels": [
    {
      required: true,
      message: "Please select at least one level",
      trigger: ["change", "blur"],
      // Custom validator to check if the JSON string represents a non-empty array
      validator: (rule: any, value: string, callback: Function) => {
        if (!value) {
          callback(new Error("Please select at least one level"));
          return;
        }
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed) || parsed.length === 0) {
            callback(new Error("Please select at least one level"));
          } else {
            callback();
          }
        } catch (e) {
          console.error("Error parsing levels value:", e);
          callback(new Error("Invalid levels format"));
        }
      },
    },
  ],
  "attributes.group": [
    {
      required: true,
      message: "Please select a workout group",
      trigger: ["change", "blur"],
    },
  ],
});

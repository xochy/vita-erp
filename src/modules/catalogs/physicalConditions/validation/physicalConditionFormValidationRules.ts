import type { FormRules } from "element-plus";
import { ref } from "vue";

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
  "attributes.description": [
    {
      required: true,
      message: "Please enter the category description",
      trigger: "blur",
    },
    {
      max: 255,
      message: "Description must be less than 255 characters",
      trigger: "blur",
    },
  ],
});
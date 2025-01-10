import { ref } from "vue";

/**
 * Validation rules for category form.
 *
 * @remarks
 * This object defines the validation rules for the category form fields.
 *
 * @public
 */
export const rules = ref({
  attributes: {
    name: [
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
    description: [
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
  },
});
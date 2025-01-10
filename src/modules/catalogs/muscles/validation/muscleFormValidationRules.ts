import { ref } from "vue";

/**
 * Validation rules for muscle form.
 *
 * @remarks
 * This object defines the validation rules for the muscle form fields.
 *
 * @public
 */
export const rules = ref({
  attributes: {
    name: [
      {
        required: true,
        message: "Please enter the muscle name",
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
        message: "Please enter the muscle description",
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
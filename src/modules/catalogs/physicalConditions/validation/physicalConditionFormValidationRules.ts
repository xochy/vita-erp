import { ref } from "vue";

/**
 * Validation rules for physical condition form.
 *
 * @remarks
 * This object defines the validation rules for the physical condition form fields.
 *
 * @public
 */
export const rules = ref({
  attributes: {
    name: [
      {
        required: true,
        message: "Please enter the physical condition name",
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
        message: "Please enter the physical condition description",
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
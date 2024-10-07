import { ref } from "vue";

/**
 * Validation rules for directory form.
 *
 * @remarks
 * This object defines the validation rules for the directory form fields.
 *
 * @public
 */
export const rules = ref({
  attributes: {
    name: [
      {
        required: true,
        message: "Please enter the directory name",
        trigger: "blur",
      },
    ],
  },
});
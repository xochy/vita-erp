import { ref } from "vue";

/**
 * Validation rules for translation form.
 *
 * @remarks
 * This object defines the validation rules for the translation form fields.
 *
 * @public
 */
export const rules = ref({
  attributes: {
    translation: [
      {
        required: true,
        message: "Please enter the translation",
        trigger: "blur",
      },
    ],
  },
});
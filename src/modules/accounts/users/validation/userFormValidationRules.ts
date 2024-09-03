import { ref } from "vue";

/**
 * Validation rules for user form.
 *
 * @remarks
 * This object defines the validation rules for the user form fields.
 *
 * @public
 */
export const rules = ref({
  attributes: {
    name: [
      {
        required: true,
        message: "Please enter the user name",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Please enter the user email",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "Please enter the user password",
        trigger: "blur",
      },
    ],
    password_confirmation: [
      {
        required: true,
        message: "Please enter the user password confirmation",
        trigger: "blur",
      },
    ],
  },
  relationships: {
    roles: {
      data: [
        {
          required: true,
          message: "Please select at least one role",
          trigger: "change",
        },
      ],
    },
  },
});

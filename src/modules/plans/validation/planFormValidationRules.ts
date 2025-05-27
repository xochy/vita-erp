import { ref } from "vue";

export const rules = ref({
  attributes: {
    name: [
      {
        required: true,
        message: "Please enter the category name",
        trigger: "blur",
      },
    ],
  },
});

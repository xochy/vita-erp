export default [
  {
    path: "/",
    redirect: "/muscles",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // muscles list
      {
        path: "/muscles",
        name: "muscles",
        component: () =>
          import("@/modules/catalogs/muscles/views/MusclesList.vue"),
        meta: {
          pageTitle: "Muscles",
          breadcrumbs: ["Catalog", "Muscles"],
          actionButtons: [
            {
              title: "Add Muscle",
              icon: "plus",
              to: { name: "muscles-saving" },
            },
          ],
        },
      },
      // muscles saving form
      {
        // optional id parameter
        path: "/muscles-saving/:id?/:tab?",
        name: "muscles-saving",
        component: () =>
          import("@/modules/catalogs/muscles/views/MusclesSaving.vue"),
        meta: {
          pageTitle: "Muscle Saving",
          breadcrumbs: ["Catalog", "Muscles", "Muscle Saving"],
          actionButtons: [
            {
              title: "Back to Muscles",
              icon: "arrow-left",
              to: { name: "muscles" },
            },
          ],
        },
      },
    ],
  },
];

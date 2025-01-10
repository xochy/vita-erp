export default [
  {
    path: "/",
    redirect: "/frequencies",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // frequencies list
      {
        path: "/frequencies",
        name: "frequencies",
        component: () =>
          import("@/modules/catalogs/frequencies/views/FrequenciesList.vue"),
        meta: {
          pageTitle: "Frequencies",
          breadcrumbs: ["Catalog", "Plans", "Frequencies"],
          actionButtons: [
            {
              title: "Add Frequency",
              icon: "plus",
              to: { name: "frequencies-saving" },
            },
          ],
        },
      },
      // frequencies saving form
      {
        // optional id parameter and tab parameter
        path: "/frequencies-saving/:id?/:tab?",
        name: "frequencies-saving",
        component: () =>
          import("@/modules/catalogs/frequencies/views/FrequenciesSaving.vue"),
        meta: {
          pageTitle: "Frequency Saving",
          breadcrumbs: ["Catalog", "Plans", "Frequencies", "Frequency Saving"],
          actionButtons: [
            {
              title: "Back to Frequencies",
              icon: "arrow-left",
              to: { name: "frequencies" },
            },
          ],
        },
      },
    ],
  }
]
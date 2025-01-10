export default [
  {
    path: "/",
    redirect: "/physical-conditions",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // physical-conditions list
      {
        path: "/physical-conditions",
        name: "physical-conditions",
        component: () =>
          import("@/modules/catalogs/physicalConditions/views/PhysicalConditionsList.vue"),
        meta: {
          pageTitle: "Physical Conditions",
          breadcrumbs: ["Catalog", "Plans", "Physical Conditions"],
          actionButtons: [
            {
              title: "Add Physical Condition",
              icon: "plus",
              to: { name: "physical-conditions-saving" },
            },
          ],
        },
      },
      // physical-conditions saving form
      {
        // optional id parameter and tab parameter
        path: "/physical-conditions-saving/:id?/:tab?",
        name: "physical-conditions-saving",
        component: () =>
          import("@/modules/catalogs/physicalConditions/views/PhysicalConditionsSaving.vue"),
        meta: {
          pageTitle: "Physical Condition Saving",
          breadcrumbs: ["Catalog", "Plans", "Physical Conditions", "Physical Condition Saving"],
          actionButtons: [
            {
              title: "Back to Physical Conditions",
              icon: "arrow-left",
              to: { name: "physical-conditions" },
            },
          ],
        },
      },
    ],
  }
]
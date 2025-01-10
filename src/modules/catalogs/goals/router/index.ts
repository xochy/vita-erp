export default [
  {
    path: "/",
    redirect: "/goals",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // goals list
      {
        path: "/goals",
        name: "goals",
        component: () =>
          import("@/modules/catalogs/goals/views/GoalsList.vue"),
        meta: {
          pageTitle: "Goals",
          breadcrumbs: ["Catalog", "Plans", "Goals"],
          actionButtons: [
            {
              title: "Add Goal",
              icon: "plus",
              to: { name: "goals-saving" },
            },
          ],
        },
      },
      // goals saving form
      {
        // optional id parameter and tab parameter
        path: "/goals-saving/:id?/:tab?",
        name: "goals-saving",
        component: () =>
          import("@/modules/catalogs/goals/views/GoalsSaving.vue"),
        meta: {
          pageTitle: "Goal Saving",
          breadcrumbs: ["Catalog", "Plans", "Goals", "Goal Saving"],
          actionButtons: [
            {
              title: "Back to Goals",
              icon: "arrow-left",
              to: { name: "goals" },
            },
          ],
        },
      },
    ],
  }
]
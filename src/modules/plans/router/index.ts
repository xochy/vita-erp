export default [
  {
    path: "/",
    redirect: "/plans",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/plans",
        name: "plans",
        component: () => import("@/modules/plans/views/PlansList.vue"),
        meta: {
          pageTitle: "Plans",
          breadcrumbs: ["Plans"],
          actionButtons: [
            {
              title: "Add Plan",
              icon: "plus",
              to: { name: "plans-saving" },
              permissions: ["create plans"],
            },
          ],
          permissions: ["read plans"],
        },
      },
      // plans saving form
      {
        // optional id parameter and tab parameter
        path: "/plans-saving/:id?/:tab?",
        name: "plans-saving",
        component: () => import("@/modules/plans/views/PlansSaving.vue"),
        meta: {
          pageTitle: "Plan Saving",
          breadcrumbs: ["Plans", "Plan Saving"],
          actionButtons: [
            {
              title: "Back to Plans",
              icon: "arrow-left",
              to: { name: "plans" },
            },
          ],
          permissions: ["show plans"],
        },
      },
    ],
  },
];

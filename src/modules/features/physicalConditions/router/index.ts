export default [
  {
    path: "/",
    redirect: "/physical-conditions",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/physical-conditions",
        name: "physical-conditions",
        component: () =>
          import("@/modules/features/physicalConditions/views/PhysicalConditionsList.vue"),
        meta: {
          pageTitle: "Physical Conditions",
          breadcrumbs: ["Catalog", "Physical Conditions"],
        },
      },
    ],
  },
];

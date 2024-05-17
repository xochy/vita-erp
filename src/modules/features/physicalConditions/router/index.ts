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
  {
    path: "/",
    redirect: "/physical-conditions-native",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/physical-conditions-native",
        name: "physical-conditions-native",
        component: () =>
          import("@/modules/features/physicalConditions/views/PhysicalConditionsListNative.vue"),
        meta: {
          pageTitle: "Physical Conditions Native",
          breadcrumbs: ["Catalog", "Physical Conditions Native"],
        },
      },
    ],
  },
  // Physical conditions details
  {
    path: "/",
    redirect: "/physical-conditions/:id/:slug",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/physical-conditions/:id/:slug",
        name: "physical-condition-details",
        component: () =>
          import("@/modules/features/physicalConditions/views/PhysicalConditionDetails.vue"),
        meta: {
          pageTitle: "Physical Condition Details",
          breadcrumbs: ["Catalog", "Physical Condition Details"],
        },
      },
    ],
  },
];

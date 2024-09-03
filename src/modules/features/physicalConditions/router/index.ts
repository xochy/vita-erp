export default [
  {
    path: "/",
    redirect: "/physical-conditions",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // physical conditions list
      {
        path: "/physical-conditions",
        name: "physical-conditions",
        component: () =>
          import(
            "@/modules/features/physicalConditions/views/PhysicalConditionsList.vue"
          ),
        meta: {
          pageTitle: "Physical Conditions",
          actionButtonText: "Add Physical Condition",
          breadcrumbs: ["Catalog", "Physical Conditions"],
          dataBsToggle: "modal",
          dataBsTarget: "#physical_condition_saving_modal",
        },
      },
      // physical condition details
      {
        path: "/physical-conditions/:id/:slug",
        name: "physical-condition-details",
        component: () =>
          import(
            "@/modules/features/physicalConditions/views/PhysicalConditionDetails.vue"
          ),
        meta: {
          pageTitle: "Physical Condition Details",
          actionButtonText: "Edit Physical Condition",
          breadcrumbs: ["Catalog", "Physical Condition Details"],
        },
      },
      // physical condition saving
      {
        path: "/physical-conditions-saving/:id?/:slug?",
        name: "physical-condition-saving",
        component: () =>
          import(
            "@/modules/features/physicalConditions/views/PhysicalConditionSaving.vue"
          ),
        meta: {
          pageTitle: "Physical Condition Saving",
          breadcrumbs: ["Catalog", "Physical Condition Saving"],
        },
      },
    ],
  },
];

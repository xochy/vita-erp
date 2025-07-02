export default [
  {
    path: "/",
    redirect: "/equipments",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // equipments list
      {
        path: "/equipments",
        name: "equipments",
        component: () =>
          import("@/modules/catalogs/equipments/views/EquipmentsList.vue"),
        meta: {
          pageTitle: "Equipment",
          breadcrumbs: ["Catalog", "Workouts", "Equipment"],
          actionButtons: [
            {
              title: "Add Equipment",
              icon: "plus",
              to: { name: "equipments-saving" },
              permissions: ["create equipments"],
            },
          ],
          permissions: ["read equipments"],
        },
      },
      // equipments saving form
      {
        path: "/equipments-saving/:id?/:tab?",
        name: "equipments-saving",
        component: () =>
          import("@/modules/catalogs/equipments/views/EquipmentsSaving.vue"),
        meta: {
          pageTitle: "Equipment Saving",
          breadcrumbs: ["Catalog", "Workouts", "Equipment", "Equipment Saving"],
          actionButtons: [
            {
              title: "Back to Equipment",
              icon: "arrow-left",
              to: { name: "equipments" },
            },
          ],
          permissions: ["show equipments"],
        },
      },
    ],
  },
];

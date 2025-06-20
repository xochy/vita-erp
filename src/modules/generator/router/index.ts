export default [
  {
    path: "/",
    redirect: "/routines-generator",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/routines-generator",
        name: "routines-generator",
        component: () => import("@/modules/generator/views/RoutinesGenerator.vue"),
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
    ],
  },
];

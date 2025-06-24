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
          pageTitle: "Routines Generator",
          breadcrumbs: ["Routines Generator"],
          permissions: ["read plans"],
        },
      },
    ],
  },
];

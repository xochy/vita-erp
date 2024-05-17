export default [
  {
    path: "/",
    redirect: "/categories",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/categories",
        name: "categories",
        component: () =>
          import("@/modules/catalogs/categories/views/CategoriesList.vue"),
        meta: {
          pageTitle: "Categories",
          breadcrumbs: ["Catalog", "Categories"],
        },
      },
    ],
  },
];

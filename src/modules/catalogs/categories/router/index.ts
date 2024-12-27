export default [
  {
    path: "/",
    redirect: "/categories",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // categories list
      {
        path: "/categories",
        name: "categories",
        component: () =>
          import("@/modules/catalogs/categories/views/CategoriesList.vue"),
        meta: {
          pageTitle: "Categories",
          breadcrumbs: ["Catalog", "Categories"],
          actionButtons: [
            {
              title: "Add Category",
              icon: "plus",
              to: { name: "categories-saving" },
            },
          ],
        },
      },
      // categories saving form
      {
        // optional id parameter and tab parameter
        path: "/categories-saving/:id?/:tab?",
        name: "categories-saving",
        component: () =>
          import("@/modules/catalogs/categories/views/CategoriesSaving.vue"),
        meta: {
          pageTitle: "Category Saving",
          breadcrumbs: ["Catalog", "Categories", "Category Saving"],
          actionButtons: [
            {
              title: "Back to Categories",
              icon: "arrow-left",
              to: { name: "categories" },
            },
          ],
        },
      },
    ],
  },
];

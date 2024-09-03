export default [
  {
    path: "/",
    redirect: "/users",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // users list
      {
        path: "/users",
        name: "users",
        component: () => import("@/modules/accounts/users/views/UsersList.vue"),
        meta: {
          pageTitle: "Users",
          actionButtonText: "Add User",
          breadcrumbs: ["Accounts", "Users"],
          // dataBsToggle: "modal",
          // dataBsTarget: "#user_saving_modal",
          newModelPath: "/users-saving",
        },
      },
      // users saving form
      {
        // optional id parameter
        path: "/users-saving/:id?",
        name: "users-saving",
        component: () =>
          import("@/modules/accounts/users/views/UsersSaving.vue"),
        meta: {
          pageTitle: "User Saving",
          breadcrumbs: ["Accounts", "Users", "User Saving"],
        },
      },
    ],
  },
];

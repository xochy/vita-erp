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
        component: () =>
          import(
            "@/modules/accounts/users/views/UsersList.vue"
          ),
        meta: {
          pageTitle: "Users",
          actionButtonText: "Add User",
          breadcrumbs: ["Accounts", "Users"],
          dataBsToggle: "modal",
          dataBsTarget: "#user_saving_modal",
        },
      },
    ],
  },
];

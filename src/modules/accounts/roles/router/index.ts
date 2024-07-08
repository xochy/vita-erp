export default [
  {
    path: "/",
    redirect: "/roles",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // roles list
      {
        path: "/roles",
        name: "roles",
        component: () =>
          import(
            "@/modules/accounts/roles/views/RolesList.vue"
          ),
        meta: {
          pageTitle: "Roles",
          actionButtonText: "Add Role",
          breadcrumbs: ["Accounts", "Roles"],
          dataBsToggle: "modal",
          dataBsTarget: "#role_saving_modal",
        },
      },
    ],
  }
]
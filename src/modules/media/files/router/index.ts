export default [
  {
    path: "/",
    redirect: "/files",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // files list
      {
        path: "/files",
        name: "files",
        component: () => import("@/modules/media/files/views/FilesManager.vue"),
        meta: {
          pageTitle: "Files",
          breadcrumbs: ["Media", "Files"],
          // actionButtons: [
          //   {
          //     title: "Add File",
          //     icon: "plus",
          //     to: { name: "files-saving" },
          //   },
          // ],
        },
      },
    ],
  },
];

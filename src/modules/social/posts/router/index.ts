export default [
  {
    path: "/",
    redirect: "/posts",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // posts list
      {
        path: "/posts",
        name: "posts",
        component: () => import("@/modules/social/posts/views/PostsList.vue"),
        meta: {
          pageTitle: "Posts",
          breadcrumbs: ["Social", "Posts"],
          actionButtons: [
            {
              title: "Add Post",
              icon: "plus",
              to: { name: "posts-saving" },
              permissions: ["create posts"],
            },
          ],
          permissions: ["read posts"],
        },
      },
      // posts saving form
      {
        // optional id parameter and tab parameter
        path: "/posts-saving/:id?/:tab?",
        name: "posts-saving",
        component: () => import("@/modules/social/posts/views/PostsSaving.vue"),
        meta: {
          pageTitle: "Post Saving",
          breadcrumbs: ["Social", "Posts", "Post Saving"],
          actionButtons: [
            {
              title: "Back to Posts",
              icon: "arrow-left",
              to: { name: "posts" },
            },
          ],
          permissions: ["show posts"],
        },
      },
    ],
  },
];

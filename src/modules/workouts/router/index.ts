export default [
  {
    path: "/",
    redirect: "/workouts",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      // workouts list
      {
        path: "/workouts",
        name: "workouts",
        component: () => import("@/modules/workouts/views/WorkoutsList.vue"),
        meta: {
          pageTitle: "Workouts",
          breadcrumbs: ["Workouts"],
          actionButtons: [
            {
              title: "Add Workout",
              icon: "plus",
              to: { name: "workouts-saving" },
              permissions: ["create workouts"],
            },
          ],
          permissions: ["read workouts"],
        },
      },
      // workouts saving form
      {
        // optional id parameter and tab parameter
        path: "/workouts-saving/:id?/:tab?",
        name: "workouts-saving",
        component: () => import("@/modules/workouts/views/WorkoutsSaving.vue"),
        meta: {
          pageTitle: "Workout Saving",
          breadcrumbs: ["Workouts", "Workout Saving"],
          actionButtons: [
            {
              title: "Back to Workouts",
              icon: "arrow-left",
              to: { name: "workouts" },
            },
          ],
          permissions: ["show workouts"],
        },
      },
    ],
  },
];

export default [
  {
    heading: "Catalogs",
    route: "/catalogs",
    pages: [
      {
        sectionTitle: "Workouts",
        route: "/workouts-cat",
        keenthemesIcon: "pulse",
        bootstrapIcon: "bi-heart-pulse-fill",
        sub: [
          {
            heading: "Categories",
            route: "/categories",
          },
          {
            heading: "Muscles",
            route: "/muscles",
          },
        ],
      },
      {
        sectionTitle: "Plans",
        route: "/plans-cat",
        keenthemesIcon: "calendar",
        bootstrapIcon: "bi-calendar",
        sub: [
          {
            heading: "Goals",
            route: "/goals",
          },
          {
            heading: "Frequencies",
            route: "/frequencies",
          },
          {
            heading: "Physical Conditions",
            route: "/physical-conditions",
          },
        ],
      },
    ],
  },
];

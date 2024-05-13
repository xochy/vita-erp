import type { MenuItem } from "@/layouts/default-layout/config/types";
import Catalog from "@/modules/catalogs/categories/layouts";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  ...Catalog,
];

export default MainMenuConfig;

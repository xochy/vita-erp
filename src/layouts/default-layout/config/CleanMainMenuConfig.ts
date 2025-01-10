import type { MenuItem } from "@/layouts/default-layout/config/types";
import Accounts from "@/modules/accounts/layouts";
import Catalog from "@/modules/catalogs/layouts";
import Media from "@/modules/media/layouts";

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
  ...Accounts,
  ...Catalog,
  ...Media,
];

export default MainMenuConfig;

import type { MenuItem } from "@/layouts/default-layout/config/types";
import Accounts from "@/modules/accounts/layouts";
import Catalog from "@/modules/catalogs/layouts";
import Media from "@/modules/media/layouts";
import Social from "@/modules/social/layouts";

import Plans from "@/modules/plans/layout";
import Workouts from "@/modules/workouts/layout";
import RoutinesGenerator from "@/modules/generator/layout";

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
  ...Plans,
  ...Workouts,
  ...RoutinesGenerator,
  ...Accounts,
  ...Catalog,
  ...Media,
  ...Social,

];

export default MainMenuConfig;

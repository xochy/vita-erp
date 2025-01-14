import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

import MediaRoutes from "@/modules/media/files/router";
import UsersRoutes from "@/modules/accounts/users/router";
import RolesRoutes from "@/modules/accounts/roles/router";

// Catalog workouts routes
import MusclesRoutes from "@/modules/catalogs/muscles/router";
import CategoriesRoutes from "@/modules/catalogs/categories/router";

// Catalog plans routes
import GoalsRoutes from "@/modules/catalogs/goals/router";
import FrequenciesRoutes from "@/modules/catalogs/frequencies/router";
import PhysicalConditionsRoutes from "@/modules/catalogs/physicalConditions/router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  ...MediaRoutes,
  ...UsersRoutes,
  ...RolesRoutes,

  // Catalog workouts routes
  ...MusclesRoutes,
  ...CategoriesRoutes,

  // Catalog plans routes
  ...GoalsRoutes,
  ...FrequenciesRoutes,
  ...PhysicalConditionsRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll to the top of the page.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  //? current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  //? reset config to initial state
  configStore.resetLayoutConfig();

  //? set headers for api requests
  authStore.setHeaders();

  // #region::Check if the route requires authentication
  if (to.meta.middleware === "auth") {
    // #region::Check if the user is authenticated
    if (!authStore.isAuthenticated) {
      //! Redirect to sign-in if not authenticated
      return next({ name: "sign-in" });
    }
    // #endregion

    // #region::Check if the user has the required permissions
    if (Array.isArray(to.meta.permissions)) {
      const hasAllPermissions = to.meta.permissions.every((permission) =>
        authStore.hasPermissionTo(permission)
      );

      if (!hasAllPermissions) {
        //! Redirect to an unauthorized page or display an error message
        return next({ name: "500" });
      }
    }
    // #endregion
  }
  // #endregion

  //* If no conditions block access, proceed to the route
  next();
});

export default router;

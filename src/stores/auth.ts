import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
  permissions: string;
}

export interface AuthPayload {
  data: {
    type: string;
    attributes: {
      email?: string;
      device_name?: string;
      password?: string;
      token?: string | null;
      permissions?: string;
    };
  };
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  /**
   * @description set the user data and token into localStorage
   * @param authUser: User
   */
  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.token);
    JwtService.savePermissions(user.value.permissions);
  }

  /**
   * @description set the error message
   * @param error: any
   */
  function setError(error: any) {
    errors.value = { ...error };
  }

  /**
   * @description remove the user data and token from localStorage
   */
  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  /**
   * @description login the user
   * @param credentials: User
   * @returns Promise<void>
   */
  function login(credentials: User) {
    const payload: AuthPayload = {
      data: {
        type: "users",
        attributes: {
          email: credentials.email,
          device_name: "web",
          password: credentials.password,
        },
      },
    };

    return ApiService.post("users/auth/signin", payload)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  /**
   * @description logout the user
   */
  function logout() {
    purgeAuth();
  }

  /**
   * @description register the user
   * @param credentials: User
   * @returns Promise<void>
   */
  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  /**
   * @description send the forgot password email
   * @param email: string
   * @returns Promise<void>
   */
  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  /**
   * @description verify the user authentication
   */
  function verifyAuth() {
    if (JwtService.getToken()) {
      // JwtService.getPermission('create')

      const payload: AuthPayload = {
        data: {
          type: "users",
          attributes: {
            token: JwtService.getToken(),
            device_name: "web",
          },
        },
      };

      ApiService.setHeader();
      ApiService.post("users/auth/refresh", payload)
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  /**
   * @description set the headers for the request
   */
  function setHeaders() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
    } else {
      purgeAuth();
    }
  }

  /**
   * @description check if the user has permission to the specified permission
   * @param permission: string
   * @returns boolean
   */
  function hasPermissionTo(permission: string): boolean {
    return JwtService.hasPermissionTo(permission)
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
    setHeaders,
    hasPermissionTo,
  };
});

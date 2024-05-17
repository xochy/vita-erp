import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface AuthPayload {
  data: {
    type: string;
    attributes: {
      email?: string;
      device_name?: string;
      password?: string;
      token?: string | null;
    };
  };
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

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

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {

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

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});

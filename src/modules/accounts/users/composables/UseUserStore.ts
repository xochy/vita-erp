import ApiService from "@/core/services/ApiService";
import type { User, UserResponse } from "../interfaces";
import { ElNotification } from "element-plus";
import { extractErrorDetail } from "@/helpers/errorHelper";
import { storeToRefs } from "pinia";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/User";

const getUser = async (id: string): Promise<UserResponse> => {
  const { data } = await ApiService.vueInstance.axios.get<UserResponse>(
    `/users/${id}?include=relatedRoles`
  );

  return data;
};

const createUser = async (user: User): Promise<UserResponse> => {
  const { attributes, relationships } = user;
  const roles = relationships?.roles.data!.map((role) => ({
    type: "roles",
    id: role.id.toString(),
  }));

  const { data } = await ApiService.vueInstance.axios.post<UserResponse>(
    "/users",
    {
      data: {
        type: "users",
        attributes,
        relationships: {
          roles: {
            data: roles,
          },
        },
      },
    }
  );

  return data;
};

const updateUser = async (user: User): Promise<UserResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<UserResponse>(
    `/users/${user.id}`,
    {
      data: {
        type: "users",
        id: user.id,
        attributes: user.attributes,
      },
    }
  );

  return data;
};

const useUser = () => {
  const store = useUserStore();
  const { user } = storeToRefs(store);
  const router = useRouter();

  const { isPending: isFetching, mutate: getUserMutate } = useMutation({
    mutationFn: getUser,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      store.setUser(data.data);
    },
  });

  const { isPending: isCreating, mutate: createUserMutate } = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        title: "Success",
        message: "User created successfully",
        type: "success",
      });
      store.clearUser();
      router.push("/users");
    },
  });

  const { isPending: isUpdating, mutate: updateUserMutate } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      ElNotification({
        title: "Error",
        message: extractErrorDetail(error),
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        title: "Success",
        message: "User updated successfully",
        type: "success",
      });
      store.clearUser();
      router.push("/users");
    },
  });

  return {
    getUser: getUserMutate,
    createUser: createUserMutate,
    updateUser: updateUserMutate,

    isLoading: isCreating || isUpdating || isFetching,
    user,
  };
};

export default useUser;

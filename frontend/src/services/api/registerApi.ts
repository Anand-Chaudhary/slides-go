import axiosInstance from "../axiosInstance";

interface User {
  username: string;
  email: string;
  password: string;
}

export const registerApi = {
  createUser: async ({ username, email, password }: User) => {
    const { data } = await axiosInstance.post(`/users/register`, {
      username,
      email,
      password,
    });
    return data;
  },
};

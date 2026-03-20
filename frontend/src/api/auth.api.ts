import { SingupData, LoginData, User } from "../types/auth.types";
import { api } from "../lib/api";

export const SingupUser = async (data: SingupData): Promise<User> => {
  const res = await api.post<User>("/auth/user/register", data);
  return res.data;
};

export const LoginUser = async (data: LoginData): Promise<User> => {
  const res = await api.post<User>("/auth/user/login", data);
  return res.data;
};

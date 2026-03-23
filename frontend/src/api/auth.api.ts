import {
  SignupData,
  LoginData,
  User,
  getCurrentUserResponse,
  AuthResponse,
} from "../types/auth.types";
import { api } from "../lib/api";

export const SingupUser = async (data: SignupData): Promise<User> => {
  const res = await api.post<User>("/auth/user/register", data);
  return res.data;
};

export const LoginUser = async (data: LoginData): Promise<User> => {
  const res = await api.post<AuthResponse>("/auth/user/login", data);
  return res.data.user;
};
export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get<getCurrentUserResponse>("/auth/user/me");
  return res.data.user;
};

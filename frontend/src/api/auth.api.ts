import {
  SignupData,
  LoginData,
  User,
  getCurrentUserResponse,
  AuthResponse,
} from "../types/auth.types";
import { api } from "../lib/api";

export const SingupUser = async (data: SignupData): Promise<User> => {
  const res = await api.post<User>("/v1/auth/user/register", data);
  return res.data;
};

export const LoginUser = async (data: LoginData): Promise<User> => {
  const res = await api.post<AuthResponse>("/v1/auth/user/login", data);
  return res.data.user;
};
export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get<getCurrentUserResponse>("/v1/auth/user/me");
  return res.data.user;
};

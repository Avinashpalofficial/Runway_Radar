import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { LoginData, LogoutData, SignupData, User } from "../types/auth.types";
import { useAuthStore } from "../store/auth.store";
import {
  LoginUser,
  SingupUser,
  logoutUser,
  getCurrentUser,
} from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface UseAuthReturn {
  login: (data: LoginData) => void;
  signup: (data: SignupData) => void;
  logout: () => void;
  isLoading: boolean;
  error: unknown;
  user: User | null;
}

export const useAuth = (): UseAuthReturn => {
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const handleAuthSuccess = (user: User) => {
    setUser(user);
    navigate("/dashboard");
  };
  const loginMutation: UseMutationResult<User, unknown, LoginData> =
    useMutation({
      mutationFn: LoginUser,
      onSuccess: handleAuthSuccess,
    });
  const signupMutation: UseMutationResult<User, unknown, SignupData> =
    useMutation({
      mutationFn: SingupUser,
      onSuccess: handleAuthSuccess,
    });
  const logoutMutation: UseMutationResult<LogoutData, unknown, void> =
    useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
        clearUser(); // store se user clear karo
        navigate("/login");
      },
    });
  const { data, isLoading: isUserLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,

    retry: false, // avoid infinite retry if not logged in
    enabled: !user,
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading:
      loginMutation.isPending ||
      signupMutation.isPending ||
      logoutMutation.isPending ||
      isUserLoading,
    error: loginMutation.error || signupMutation.error || logoutMutation.error,
    user,
  };
};

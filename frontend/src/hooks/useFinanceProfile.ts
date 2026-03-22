import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFinancialProfile,
  getFinanceProfile,
  updateFinancialProfile,
} from "../api/finance.Profile.api";
import { FinanceProfile } from "../types/financial.profile.types";

export const useFinanceProfile = () => {
  const queryClient = useQueryClient();

  // 🔹 GET profile
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<FinanceProfile>({
    queryKey: ["finance-profile"],
    queryFn: getFinanceProfile,
  });

  // 🔹 CREATE profile
  const { mutate: createProfile, isPending: createLoading } = useMutation({
    mutationFn: createFinancialProfile,
    onSuccess: (data) => {
      // cache update (fast UI)
      queryClient.setQueryData(["finance-profile"], data);
    },
  });

  // 🔹 UPDATE profile
  const { mutate: updateProfile, isPending: updateLoading } = useMutation({
    mutationFn: updateFinancialProfile,
    onSuccess: (data) => {
      // cache update
      queryClient.setQueryData(["finance-profile"], data);
    },
  });

  return {
    // 📦 data
    profile,
    isLoading,
    isError,

    // ➕ create
    createProfile,
    createLoading,

    // ✏️ update
    updateProfile,
    updateLoading,
  };
};

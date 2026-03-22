import { api } from "../lib/api";
import {
  CreateFinancialProfile,
  CreateFinancialProfileResponse,
  FinanceProfile,
  GetFinancialProfileResponse,
  UpdateFinancialProfile,
  UpdateFinancialProfileResponse,
} from "../types/financial.profile.types";

export const createFinancialProfile = async (
  data: CreateFinancialProfile,
): Promise<FinanceProfile> => {
  const res = await api.post<CreateFinancialProfileResponse>(
    "/financial/financial-profile",
    data,
  );
  return res.data.profile;
};

export const getFinanceProfile = async (): Promise<FinanceProfile> => {
  const res = await api.get<GetFinancialProfileResponse>(
    "/financial/financial-profile",
  );
  return res.data.data;
};
export const updateFinancialProfile = async (
  data: UpdateFinancialProfile,
): Promise<FinanceProfile> => {
  const res = await api.patch<UpdateFinancialProfileResponse>(
    "/financial/update-financial-profile",
    data,
  );
  return res.data.data;
};

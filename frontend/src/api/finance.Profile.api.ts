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
    "/v1/financial/financial-profile",
    data,
  );
  return res.data.profile;
};

export const getFinanceProfile = async (): Promise<FinanceProfile> => {
  const res = await api.get<GetFinancialProfileResponse>(
    "/v1/financial/financial-profile",
  );
  return res.data.data;
};
export const updateFinancialProfile = async (
  data: UpdateFinancialProfile,
): Promise<FinanceProfile> => {
  const res = await api.patch<UpdateFinancialProfileResponse>(
    "/v1/financial/update-financial-profile",
    data,
  );
  return res.data.data;
};

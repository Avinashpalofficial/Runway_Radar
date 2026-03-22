export interface FinanceProfile {
  id: string;
  cashAvailable: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFinancialProfile {
  cashAvailable: string;
}

export interface CreateFinancialProfileResponse {
  success: boolean;
  profile: FinanceProfile;
}
export interface GetFinancialProfileResponse {
  success: boolean;
  data: FinanceProfile;
}

export interface UpdateFinancialProfile {
  cashAvailable: string;
}
export interface UpdateFinancialProfileResponse {
  success: boolean;
  data: FinanceProfile;
}

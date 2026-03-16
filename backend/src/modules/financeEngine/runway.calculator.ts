import { FinancialProfile } from "@prisma/client";

export const calculateRunway = (
  financialProfile: FinancialProfile | null,
  burn: number,
) => {
  if (!financialProfile || burn <= 0) {
    return null;
  }
  const cash = Number(financialProfile.cashAvailable);
  return cash / burn;
};

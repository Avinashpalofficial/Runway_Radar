import { prisma } from "../../config/db";
import { Prisma } from "@prisma/client";

export const createFinancialProfile = async (
  userId: string,
  cashAvailable: Prisma.Decimal,
) => {
  return prisma.financialProfile.create({
    data: {
      userId,
      cashAvailable,
    },
  });
};
export const getFinancialProfile = async (userId: string) => {
  return prisma.financialProfile.findUnique({
    where: { userId },
  });
};
export const updateFinancialProfile = async (
  userId: string,
  cashAvailable: Prisma.Decimal,
) => {
  return prisma.financialProfile.update({
    where: { userId },
    data: {
      cashAvailable,
    },
  });
};

import { Prisma } from "@prisma/client";
import { catchAsyncError } from "../../middlewares/catchAsync";
import { ErrorHandler } from "../../utils/ErrorHandler";
import * as financialService from "./financialProfile.service";
import { success } from "zod";

export const createProfile = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  console.log("userId", userId);

  const { cashAvailable } = req.body;

  const existing = await financialService.getFinancialProfile(userId);
  if (existing) {
    throw new ErrorHandler("Financial Profile already exist", 401);
  }

  const profile = await financialService.createFinancialProfile(
    userId,
    new Prisma.Decimal(cashAvailable),
  );
  res.status(200).json({
    success: true,
    profile,
  });
});

/*
 Get financial Profile
*/
export const getFinancialProfile = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const profile = await financialService.getFinancialProfile(userId);
  if (!profile) {
    throw new ErrorHandler("financial profile not found", 401);
  }
  res.status(200).json({
    success: true,
    data: profile,
  });
});

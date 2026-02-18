import { Prisma } from "@prisma/client";
import { catchAsyncError } from "../../middlewares/catchAsync";
import { ErrorHandler } from "../../utils/ErrorHandler";
import * as financialService from "./financialProfile.service";

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

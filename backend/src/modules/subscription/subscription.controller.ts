import { catchAsyncError } from "../../middlewares/catchAsync";
import { ErrorHandler } from "../../utils/ErrorHandler";
import * as subscriptionServices from "./subscription.service";
import { BillingType, Status } from "@prisma/client";
export const create = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    throw new ErrorHandler("userId not found", 401);
  }
  const { name, currency, price, billingType } = req.body;
  const subscription = await subscriptionServices.createSubscription(
    userId,
    name,
    currency,
    price,
    billingType as BillingType,
  );
  res.status(200).json({
    success: true,
    subscription,
  });
});

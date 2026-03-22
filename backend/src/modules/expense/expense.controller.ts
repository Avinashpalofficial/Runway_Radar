import { Prisma } from "@prisma/client";
import * as expenseService from "../expense/expense.service";
import { catchAsyncError } from "../../middlewares/catchAsync";
import { errorMiddleware } from "../../middlewares/errorMiddleware";
import { ErrorHandler } from "../../utils/ErrorHandler";

export const create = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  console.log("userId1:", userId);

  const { title, currency, amount, category } = req.body;
  const expense = await expenseService.createExpense(
    userId,
    title,
    currency,
    amount,
    category,
  );

  res.status(200).json({
    success: true,
    expense,
  });
});

/**
 * Get Expense Controller
 */

export const getAll = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const expense = await expenseService.getExpense(userId);
  if (!expense) {
    throw new ErrorHandler("user expense is not exist", 401);
  }
  res.status(200).json({
    success: true,
    expense,
  });
});

/**
 *
 * Update Expense Controller
 */

export const update = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id as string;
  const { amount, category } = req.body;
  const expense = await expenseService.updateExpense(
    userId,
    id,
    amount,
    category,
  );
  res.status(200).json({
    success: true,
    expense,
  });
});

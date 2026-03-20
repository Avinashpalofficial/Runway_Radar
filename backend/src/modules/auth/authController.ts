import { tr } from "zod/v4/locales";
import { prisma } from "../../config/db";
import { catchAsyncError } from "../../middlewares/catchAsync";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { sendToken } from "../../utils/sendToken";
import bcrypt from "bcrypt";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ErrorHandler("User is already exist", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
    },
  });
  sendToken(user, 200, res);
});
// login User
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  //check user is exist or not
  if (!user) {
    throw new ErrorHandler("Invalid email or password", 400);
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  //check password is correct or not
  if (!comparePassword) {
    throw new ErrorHandler("Invalid password", 400);
  }
  sendToken(user, 200, res);
});

export const getCurrentUser = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  res.status(200).json({
    user,
  });
});

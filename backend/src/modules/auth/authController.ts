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

import { prisma } from "../config/db";
import { ErrorHandler } from "../utils/ErrorHandler";
import { catchAsyncError } from "./catchAsync";
import Jwt, { JwtPayload } from "jsonwebtoken";

export const authUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies?.token;
  console.log("token", token);

  if (!token) {
    throw new ErrorHandler("Please login to access this resource", 401);
  }
  const decoded = Jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload & { id: string };

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
    },
  });
  if (!user) {
    throw new ErrorHandler("User not found", 401);
  }
  req.user = user;
  next();
});

import { Response } from "express";
import { ErrorHandler } from "./ErrorHandler";
import jwt from "jsonwebtoken";

interface TokenUser {
  id: string;
  email: string;
}
export const sendToken = (
  user: TokenUser,
  statusCode: number,
  res: Response,
): void => {
  if (!process.env.JWT_SECRET) {
    throw new ErrorHandler("JWT_SECRET is not defined", 400);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_TIME as string },
  );
  const cookieExpire = Number(process.env.COOKIE_EXPIRES_TIME);
  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "lax" as const,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

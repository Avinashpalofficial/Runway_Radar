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
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_TIME || "1d" },
  );

  const cookieExpireDays = Number(process.env.COOKIE_EXPIRES_TIME) || 1;

  const options = {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ fixed
    sameSite: "lax" as const,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

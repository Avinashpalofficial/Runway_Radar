import { Response } from "express";
import { ErrorHandler } from "./ErrorHandler";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { CookieOptions } from "express";

interface TokenUser {
  id: string;
  email: string;
}

export const sendToken = (
  user: TokenUser,
  statusCode: number,
  res: Response,
): void => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_TIME || "1d";

  if (!secret) {
    throw new ErrorHandler("JWT_SECRET is not defined", 400);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    secret as Secret,
    { expiresIn } as SignOptions,
  );

  const cookieExpireDays = Number(process.env.COOKIE_EXPIRES_TIME) || 1;

  const options: CookieOptions = {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

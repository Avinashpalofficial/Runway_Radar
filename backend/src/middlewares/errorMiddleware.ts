import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

import { ErrorHandler } from "../utils/ErrorHandler";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";

  //Custom App Error
  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Prisma known Error
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        statusCode = 404;
        message = "Resource not found";
        break;
      case "P2002":
        statusCode = 400;
        message = `Duplicate field value : ${err.meta?.target}`;
        break;
      default:
        statusCode = 400;
        message = "Database Error";
    }
  }
  //JWT Errors
  else if (err instanceof Error) {
    if (err.name === "jsonWebTokenError") {
      statusCode = 401;
      message = "Invalid JWT token .Try again !";
    }
    if (err.name === "TokenExpiredError") {
      statusCode = 401;
      message = "JWT token expired .Please login again";
    } else {
      message = err.message;
    }
  }
  res.status(statusCode).json({
    success: false,
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? undefined
        : err instanceof Error
          ? err.stack
          : undefined,
  });
};

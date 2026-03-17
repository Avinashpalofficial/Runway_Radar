import { RequestHandler } from "express";
import { ZodObject } from "zod";
import { catchAsyncError } from "./catchAsync";
import { ErrorHandler } from "../utils/ErrorHandler";

export const validate = (schema: ZodObject): RequestHandler =>
  catchAsyncError(async (req, _res, next) => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      const message = result.error.issues[0].message;
      throw new ErrorHandler(message, 400);
    }
    req.body = result.data;
    next();
  });

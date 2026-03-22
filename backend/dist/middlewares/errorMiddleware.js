"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const client_1 = require("@prisma/client");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const errorMiddleware = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    //Custom App Error
    if (err instanceof ErrorHandler_1.ErrorHandler) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Prisma known Error
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
        }
        else {
            message = err.message;
        }
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "production"
            ? undefined
            : err instanceof Error
                ? err.stack
                : undefined,
    });
};
exports.errorMiddleware = errorMiddleware;

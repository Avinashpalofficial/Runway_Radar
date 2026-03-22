"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendToken = (user, statusCode, res) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_TIME || "1d";
    if (!secret) {
        throw new ErrorHandler_1.ErrorHandler("JWT_SECRET is not defined", 400);
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret, { expiresIn });
    const cookieExpireDays = Number(process.env.COOKIE_EXPIRES_TIME) || 1;
    const options = {
        expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};
exports.sendToken = sendToken;

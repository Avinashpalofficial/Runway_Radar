"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const db_1 = require("../config/db");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const catchAsync_1 = require("./catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authUser = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const token = req.cookies?.token;
    console.log("token", token);
    if (!token) {
        throw new ErrorHandler_1.ErrorHandler("Please login to access this resource", 401);
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = await db_1.prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
        },
    });
    if (!user) {
        throw new ErrorHandler_1.ErrorHandler("User not found", 401);
    }
    req.user = user;
    next();
});

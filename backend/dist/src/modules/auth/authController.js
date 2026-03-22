"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const db_1 = require("../../config/db");
const catchAsync_1 = require("../../middlewares/catchAsync");
const ErrorHandler_1 = require("../../utils/ErrorHandler");
const sendToken_1 = require("../../utils/sendToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.registerUser = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const { name, email, phoneNumber, password } = req.body;
    const existingUser = await db_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new ErrorHandler_1.ErrorHandler("User is already exist", 400);
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await db_1.prisma.user.create({
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
    (0, sendToken_1.sendToken)(user, 200, res);
});
// login User
exports.loginUser = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await db_1.prisma.user.findUnique({
        where: { email },
    });
    //check user is exist or not
    if (!user) {
        throw new ErrorHandler_1.ErrorHandler("Invalid email or password", 400);
    }
    const comparePassword = await bcrypt_1.default.compare(password, user.password);
    //check password is correct or not
    if (!comparePassword) {
        throw new ErrorHandler_1.ErrorHandler("Invalid password", 400);
    }
    (0, sendToken_1.sendToken)(user, 200, res);
});
exports.getCurrentUser = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const userId = req.user.id;
    const user = await db_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    res.status(200).json({
        user,
    });
});

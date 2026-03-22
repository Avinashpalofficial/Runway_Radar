"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = exports.create = void 0;
const expenseService = __importStar(require("../expense/expense.service"));
const catchAsync_1 = require("../../middlewares/catchAsync");
const ErrorHandler_1 = require("../../utils/ErrorHandler");
exports.create = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const userId = req.user.id;
    console.log("userId1:", userId);
    const { title, currency, amount, category } = req.body;
    const expense = await expenseService.createExpense(userId, title, currency, amount, category);
    res.status(200).json({
        success: true,
        expense,
    });
});
/**
 * Get Expense Controller
 */
exports.getAll = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const userId = req.user.id;
    const expense = await expenseService.getExpense(userId);
    if (!expense) {
        throw new ErrorHandler_1.ErrorHandler("user expense is not exist", 401);
    }
    res.status(200).json({
        success: true,
        expense,
    });
});
/**
 *
 * Update Expense Controller
 */
exports.update = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const userId = req.user.id;
    const id = req.params.id;
    const { amount, category } = req.body;
    const expense = await expenseService.updateExpense(userId, id, amount, category);
    res.status(200).json({
        success: true,
        expense,
    });
});

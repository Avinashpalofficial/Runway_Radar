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
exports.updateFinancialProfile = exports.getFinancialProfile = exports.createProfile = void 0;
const client_1 = require("@prisma/client");
const catchAsync_1 = require("../../middlewares/catchAsync");
const ErrorHandler_1 = require("../../utils/ErrorHandler");
const financialService = __importStar(require("./financialProfile.service"));
exports.createProfile = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const userId = req.user.id;
    console.log("userId", userId);
    const { cashAvailable } = req.body;
    const existing = await financialService.getFinancialProfile(userId);
    if (existing) {
        throw new ErrorHandler_1.ErrorHandler("Financial Profile already exist", 401);
    }
    const profile = await financialService.createFinancialProfile(userId, new client_1.Prisma.Decimal(cashAvailable));
    res.status(200).json({
        success: true,
        profile,
    });
});
/*
 Get financial Profile
*/
exports.getFinancialProfile = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const userId = req.user.id;
    const profile = await financialService.getFinancialProfile(userId);
    if (!profile) {
        throw new ErrorHandler_1.ErrorHandler("financial profile not found", 401);
    }
    res.status(200).json({
        success: true,
        data: profile,
    });
});
/*
updata financial profile
*/
exports.updateFinancialProfile = (0, catchAsync_1.catchAsyncError)(async (req, res, next) => {
    const userId = req.user.id;
    const { cashAvailable } = req.body;
    if (!userId) {
        throw new ErrorHandler_1.ErrorHandler("userId not exist", 401);
    }
    const updateProfile = await financialService.updateFinancialProfile(userId, new client_1.Prisma.Decimal(cashAvailable));
    res.status(200).json({
        success: true,
        data: updateProfile,
    });
});

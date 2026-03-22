"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const catchAsync_1 = require("./catchAsync");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const validate = (schema) => (0, catchAsync_1.catchAsyncError)(async (req, _res, next) => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
        const message = result.error.issues[0].message;
        throw new ErrorHandler_1.ErrorHandler(message, 400);
    }
    req.body = result.data;
    next();
});
exports.validate = validate;

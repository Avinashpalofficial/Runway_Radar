"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const financialProfile_routes_1 = __importDefault(require("./routes/financialProfile.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("RUNNING NEW BUILD 🚀");
});
// CORS Configuration - Support both local and production
app.use((0, cors_1.default)({
    origin: [
        "https://runway-radar.vercel.app", // Production frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Health check endpoint for Railway deployments
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/financial", financialProfile_routes_1.default);
app.use("/api/v1/subscription", subscription_routes_1.default);
app.use("/api/v1/expense", expense_routes_1.default);
app.use("/api/v1/dashboard", dashboard_routes_1.default);
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;

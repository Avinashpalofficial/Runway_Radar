import express from "express";
import router from "./routes/authRoutes";
import financialRouter from "./routes/financialProfile.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import subscriptionRouter from "./routes/subscription.routes";
import expenseRouter from "./routes/expense.routes";
import getDashboard from "./routes/dashboard.routes";
import dashboardRouter from "./routes/dashboard.routes";

const app = express();
app.get("/", (req, res) => {
  res.send("RUNNING NEW BUILD 🚀");
});
// CORS Configuration - Support both local and production
app.use(
  cors({
    origin: [
      "https://runway-radar.vercel.app", // Production frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Health check endpoint for Railway deployments
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/api/v1/auth", router);
app.use("/api/v1/financial", financialRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(errorMiddleware);

export default app;

import express from "express";
import router from "./routes/authRoutes";
import financialRouter from "./routes/financialProfile.routes";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import subscriptionRouter from "./routes/subscription.routes";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", router);
app.use("/api/v1", financialRouter);
app.use("/api/v1", subscriptionRouter);
app.use(errorMiddleware);
export default app;

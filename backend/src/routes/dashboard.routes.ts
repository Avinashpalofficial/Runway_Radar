import { Router } from "express";
import { authUser } from "../middlewares/auth";
import { getDashboard } from "../modules/dashboard/dashboard.controller";

const dashboardRouter = Router();

dashboardRouter.get("/summary", authUser, getDashboard);
export default getDashboard;

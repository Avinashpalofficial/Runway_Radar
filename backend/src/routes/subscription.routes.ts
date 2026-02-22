import { Router } from "express";
import { authUser } from "../middlewares/auth";
import { create } from "../modules/subscription/subscription.controller";

const subscriptionRouter = Router();

subscriptionRouter.post("/", authUser, create);
export default subscriptionRouter;

import { Router } from "express";
import { authUser } from "../middlewares/auth";
import {
  allSubscription,
  create,
} from "../modules/subscription/subscription.controller";

const subscriptionRouter = Router();

subscriptionRouter.post("/", authUser, create);
subscriptionRouter.get("/all-subscription", authUser, allSubscription);
export default subscriptionRouter;

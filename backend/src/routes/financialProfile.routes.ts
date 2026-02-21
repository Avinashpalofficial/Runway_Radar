import { Router } from "express";
import { authUser } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createFinancialProfileSchema,
  updateFinancialProfileSchema,
} from "../validate/financialProfile.schema";
import {
  createProfile,
  getFinancialProfile,
  updateFinancialProfile,
} from "../modules/financialProfile/financialProfile.controller";

const financialRouter = Router();

financialRouter.post(
  "/financial-profile",
  authUser,
  validate(createFinancialProfileSchema),
  createProfile,
);
financialRouter.get("/financial-profile", authUser, getFinancialProfile);
financialRouter.post(
  "/financial-profile",
  authUser,
  validate(updateFinancialProfileSchema),
  updateFinancialProfile,
);

export default financialRouter;

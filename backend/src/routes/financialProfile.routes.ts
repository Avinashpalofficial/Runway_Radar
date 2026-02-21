import { Router } from "express";
import { authUser } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createFinancialProfileSchema } from "../validate/financialProfile.schema";
import { createProfile } from "../modules/financialProfile/financialProfile.controller";

const financialRouter = Router();

financialRouter.post(
  "/financial-profile",
  authUser,
  validate(createFinancialProfileSchema),
  createProfile,
);

export default financialRouter;

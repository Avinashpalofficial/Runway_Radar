import { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../validate/registerValidation";
import { registerUser } from "../modules/auth/authController";

export const router = Router();

router.post("/user/register", validate(registerSchema), registerUser);

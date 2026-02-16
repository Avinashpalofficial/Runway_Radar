import { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../validate/registerValidation";
import { registerUser } from "../modules/auth/authController";

const router = Router();

router.post("/user/register", validate(registerSchema), registerUser);
export default router;

import { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../validate/registerValidation";
import { loginUser, registerUser } from "../modules/auth/authController";
import { loginSchema } from "../validate/loginValidation";

const router = Router();

router.post("/user/register", validate(registerSchema), registerUser);
router.post("/user/login", validate(loginSchema), loginUser);
export default router;

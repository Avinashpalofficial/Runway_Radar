import { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../validate/registerValidation";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../modules/auth/authController";
import { loginSchema } from "../validate/loginValidation";
import { authUser } from "../middlewares/auth";

const router = Router();

router.post("/user/register", validate(registerSchema), registerUser);
router.post("/user/login", validate(loginSchema), loginUser);
router.post("user/logout", authUser, logoutUser);
router.get("/user/me", authUser, getCurrentUser);
export default router;

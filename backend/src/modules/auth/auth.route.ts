import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

// Public Routes
router.post(
  "/register",
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.register
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);

router.post("/refresh-token", AuthController.refreshToken);

// Protected Routes
router.post("/logout", auth(), AuthController.logout);

router.get("/me", auth(), AuthController.getMe);

export const AuthRoutes = router;
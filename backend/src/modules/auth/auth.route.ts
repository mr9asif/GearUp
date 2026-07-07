import { Router } from "express";
import { CategoryController, registerUser } from "./auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/category", CategoryController.createCategory)

export const AuthRoutes = router;
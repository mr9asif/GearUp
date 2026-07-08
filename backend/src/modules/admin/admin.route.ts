import express from "express";
import auth from "../../middleware/auth";

import { Role } from "../../generated/prisma";
import validateRequest from "../../middleware/validateRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

// Get all users
router.get(
  "/users",
  auth(Role.ADMIN),
  AdminController.getAllUsers
);

// Get single user
router.get(
  "/users/:id",
  auth(Role.ADMIN),
  AdminController.getSingleUser
);

// Update user status
router.patch(
  "/users/:id/status",
  auth(Role.ADMIN),
  validateRequest(AdminValidation.updateUserStatusValidationSchema),
  AdminController.updateUserStatus
);

export const AdminRoutes = router;
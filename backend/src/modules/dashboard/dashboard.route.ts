import express from "express";


import { Role } from "@prisma/client";
import auth from "../../middleware/auth";
import { DashboardController } from "./dashboard.controller";

const router = express.Router();

// Provider Dashboard
router.get(
  "/provider",
  auth(Role.PROVIDER),
  DashboardController.getProviderDashboard
);

// Customer Dashboard (We'll implement next)
router.get(
  "/customer",
  auth(Role.CUSTOMER),
  DashboardController.getCustomerDashboard
);

export const DashboardRoutes = router;
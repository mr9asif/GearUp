import express from "express";
import auth from "../../../middleware/auth";

import { Role } from "../../../generated/prisma";
import { ProviderRentalController } from "./provider.rental.controller";

const router = express.Router();

// Provider dashboard orders
router.get(
  "/orders",
  auth(Role.PROVIDER),
  ProviderRentalController.getProviderOrders
);

// Single order
router.get(
  "/orders/:id",
  auth(Role.PROVIDER),
  ProviderRentalController.getSingleOrder
);

// Accept order
router.patch(
  "/:id/accept",
  auth(Role.PROVIDER),
  ProviderRentalController.acceptRental
);

// Reject order
router.patch(
  "/:id/reject",
  auth(Role.PROVIDER),
  ProviderRentalController.rejectRental
);

// Start rental
router.patch(
  "/:id/start",
  auth(Role.PROVIDER),
  ProviderRentalController.startRental
);

// Complete rental
router.patch(
  "/:id/complete",
  auth(Role.PROVIDER),
  ProviderRentalController.completeRental
);

export const ProviderRentalRoutes = router;
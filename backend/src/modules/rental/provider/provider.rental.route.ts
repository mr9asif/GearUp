import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ProviderRentalController } from "./provider.rental.controller";

const router = express.Router();

// Provider dashboard orders
router.get(
  "/orders",
  auth(USER_ROLE.PROVIDER),
  ProviderRentalController.getProviderOrders
);

// Single order
router.get(
  "/orders/:id",
  auth(USER_ROLE.PROVIDER),
  ProviderRentalController.getSingleOrder
);

// Accept order
router.patch(
  "/:id/accept",
  auth(USER_ROLE.PROVIDER),
  ProviderRentalController.acceptRental
);

// Reject order
router.patch(
  "/:id/reject",
  auth(USER_ROLE.PROVIDER),
  ProviderRentalController.rejectRental
);

// Start rental
router.patch(
  "/:id/start",
  auth(USER_ROLE.PROVIDER),
  ProviderRentalController.startRental
);

// Complete rental
router.patch(
  "/:id/complete",
  auth(USER_ROLE.PROVIDER),
  ProviderRentalController.completeRental
);

export const ProviderRentalRoutes = router;
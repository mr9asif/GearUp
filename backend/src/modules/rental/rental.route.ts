import express from "express";
import { CustomerRentalRoutes } from "./customer/customer.rental.route";
import { ProviderRentalRoutes } from "./provider/provider.rental.route";

const router = express.Router();

router.use("/customer", CustomerRentalRoutes);
router.use("/provider", ProviderRentalRoutes);

export const RentalRoutes = router;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middleware/auth"));
const prisma_1 = require("../../../generated/prisma");
const provider_rental_controller_1 = require("./provider.rental.controller");
const router = express_1.default.Router();
// Provider dashboard orders
router.get("/orders", (0, auth_1.default)(prisma_1.Role.PROVIDER), provider_rental_controller_1.ProviderRentalController.getProviderOrders);
// Single order
router.get("/orders/:id", (0, auth_1.default)(prisma_1.Role.PROVIDER), provider_rental_controller_1.ProviderRentalController.getSingleOrder);
// Accept order
router.patch("/:id/accept", (0, auth_1.default)(prisma_1.Role.PROVIDER), provider_rental_controller_1.ProviderRentalController.acceptRental);
router.get("/incoming-orders", (0, auth_1.default)(prisma_1.Role.PROVIDER), provider_rental_controller_1.ProviderRentalController.getIncomingOrders);
// Reject order
router.patch("/:id/reject", (0, auth_1.default)(prisma_1.Role.PROVIDER), provider_rental_controller_1.ProviderRentalController.rejectRental);
// Start rental
router.patch("/:id/start", (0, auth_1.default)(prisma_1.Role.PROVIDER), provider_rental_controller_1.ProviderRentalController.startRental);
// Complete rental
router.patch("/:id/complete", (0, auth_1.default)(prisma_1.Role.PROVIDER), provider_rental_controller_1.ProviderRentalController.completeRental);
exports.ProviderRentalRoutes = router;

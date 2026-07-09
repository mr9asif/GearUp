"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const rental_validation_1 = require("../rental.validation");
const prisma_1 = require("../../../generated/prisma");
const customer_rental_controller_1 = require("./customer.rental.controller");
const router = express_1.default.Router();
// Customer places a rental order
router.post("/", (0, auth_1.default)(prisma_1.Role.CUSTOMER), (0, validateRequest_1.default)(rental_validation_1.RentalValidation.createRentalSchema), customer_rental_controller_1.CustomerRentalController.createRental);
// Customer's rental history
router.get("/my-orders", (0, auth_1.default)(prisma_1.Role.CUSTOMER), customer_rental_controller_1.CustomerRentalController.getMyOrders);
// Single rental details
router.get("/my-orders/:id", (0, auth_1.default)(prisma_1.Role.CUSTOMER), customer_rental_controller_1.CustomerRentalController.getMyOrderById);
// Cancel rental
router.patch("/:id/cancel", (0, auth_1.default)(prisma_1.Role.CUSTOMER), customer_rental_controller_1.CustomerRentalController.cancelRental);
// status trace
router.get("/:id/rental-status", (0, auth_1.default)(prisma_1.Role.CUSTOMER), customer_rental_controller_1.CustomerRentalController.getRentalStatus);
// payment status 
router.get("/:id/payment-status", (0, auth_1.default)(prisma_1.Role.CUSTOMER), customer_rental_controller_1.CustomerRentalController.getPaymentStatus);
exports.CustomerRentalRoutes = router;

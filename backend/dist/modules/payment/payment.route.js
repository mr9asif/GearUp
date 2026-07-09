"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../generated/prisma");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const payment_controller_1 = require("./payment.controller");
const payment_validation_1 = require("./payment.validation");
const router = express_1.default.Router();
const confirmPayment = async (req, res) => {
    console.log("🔥 Webhook controller reached");
};
/**
 * Customer
 */
// Create Stripe Checkout Session / Payment Intent
router.post("/create", (0, auth_1.default)(prisma_1.Role.CUSTOMER), (0, validateRequest_1.default)(payment_validation_1.PaymentValidation.createPaymentSchema), payment_controller_1.PaymentController.createPayment);
// Confirm Payment (Webhook / Callback)
router.post("/confirm", payment_controller_1.PaymentController.confirmPayment);
router.get("/success", (req, res) => {
    res.send("Payment successful!");
});
router.get("/cancel", (req, res) => {
    res.send("Payment cancelled!");
});
// Get Logged-in User Payment History
router.get("/", (0, auth_1.default)(prisma_1.Role.CUSTOMER), payment_controller_1.PaymentController.getMyPayments);
// Get Single Payment Details
router.get("/:id", (0, auth_1.default)(prisma_1.Role.CUSTOMER), payment_controller_1.PaymentController.getPaymentById);
exports.PaymentRoutes = router;

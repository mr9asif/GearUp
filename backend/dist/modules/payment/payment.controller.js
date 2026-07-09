"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const createPayment = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const { orderId } = req.body;
    const result = await payment_service_1.PaymentService.createCheckoutSession(customerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Checkout session created successfully",
        data: result,
    });
});
const confirmPayment = async (req, res) => {
    const signature = req.headers["stripe-signature"];
    const result = await payment_service_1.PaymentService.confirmPayment(signature, req.body);
    return res.status(http_status_1.default.OK).json(result);
};
const getMyPayments = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const result = await payment_service_1.PaymentService.getMyPayments(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Payments retrieved successfully",
        data: result,
    });
});
const getPaymentById = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const paymentId = req.params.id;
    const result = await payment_service_1.PaymentService.getPaymentById(customerId, paymentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Payment retrieved successfully",
        data: result,
    });
});
exports.PaymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
    getPaymentById,
};

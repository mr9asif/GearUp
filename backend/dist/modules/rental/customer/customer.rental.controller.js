"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRentalController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const customer_rental_service_1 = require("./customer.rental.service");
const createRental = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const result = await customer_rental_service_1.CustomerRentalService.createRental(customerId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Rental order placed successfully",
        data: result,
    });
});
const getMyOrders = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const result = await customer_rental_service_1.CustomerRentalService.getMyOrders(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental orders retrieved successfully",
        data: result,
    });
});
const getMyOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const orderId = req.params.id;
    const result = await customer_rental_service_1.CustomerRentalService.getMyOrderById(customerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental order retrieved successfully",
        data: result,
    });
});
const cancelRental = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const orderId = req.params.id;
    const result = await customer_rental_service_1.CustomerRentalService.cancelRental(customerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental order cancelled successfully",
        data: result,
    });
});
// track status
const getRentalStatus = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const rentalId = req.params.id;
    const result = await customer_rental_service_1.CustomerRentalService.getRentalStatus(customerId, rentalId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rental status retrieved successfully",
        data: result,
    });
});
// payment status
const getPaymentStatus = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const rentalId = req.params.id;
    const result = await customer_rental_service_1.CustomerRentalService.getPaymentStatus(customerId, rentalId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payment status retrieved successfully",
        data: result,
    });
});
exports.CustomerRentalController = {
    createRental,
    getMyOrders,
    getMyOrderById,
    cancelRental,
    getRentalStatus,
    getPaymentStatus,
};

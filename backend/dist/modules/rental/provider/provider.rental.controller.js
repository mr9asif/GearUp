"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRentalController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const provider_rental_service_1 = require("./provider.rental.service");
const getProviderOrders = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const result = await provider_rental_service_1.ProviderRentalService.getProviderOrders(providerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental orders retrieved successfully",
        data: result,
    });
});
const getSingleOrder = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const orderId = req.params.id;
    const result = await provider_rental_service_1.ProviderRentalService.getProviderOrderById(providerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental order retrieved successfully",
        data: result,
    });
});
const acceptRental = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const orderId = req.params.id;
    const result = await provider_rental_service_1.ProviderRentalService.acceptRental(providerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental accepted successfully",
        data: result,
    });
});
const rejectRental = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const orderId = req.params.id;
    const result = await provider_rental_service_1.ProviderRentalService.rejectRental(providerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental rejected successfully",
        data: result,
    });
});
const startRental = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const orderId = req.params.id;
    const result = await provider_rental_service_1.ProviderRentalService.startRental(providerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental started successfully",
        data: result,
    });
});
const completeRental = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const orderId = req.params.id;
    const result = await provider_rental_service_1.ProviderRentalService.completeRental(providerId, orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Rental completed successfully",
        data: result,
    });
});
// get incoming orders
const getIncomingOrders = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const result = await provider_rental_service_1.ProviderRentalService.getIncomingOrders(providerId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Incoming rental orders retrieved successfully",
        data: result,
    });
});
exports.ProviderRentalController = {
    getProviderOrders,
    getSingleOrder,
    acceptRental,
    rejectRental,
    startRental,
    completeRental,
    getIncomingOrders
};

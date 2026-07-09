"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const dashboard_service_1 = require("./dashboard.service");
const getProviderDashboard = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const result = await dashboard_service_1.DashboardService.getProviderDashboard(providerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Provider dashboard retrieved successfully",
        data: result,
    });
});
const getCustomerDashboard = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const result = await dashboard_service_1.DashboardService.getCustomerDashboard(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer dashboard retrieved successfully",
        data: result,
    });
});
exports.DashboardController = {
    getProviderDashboard,
    getCustomerDashboard,
};

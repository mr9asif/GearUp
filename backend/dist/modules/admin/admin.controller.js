"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllUsers(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.AdminService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});
const updateUserStatus = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.AdminService.updateUserStatus(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User status updated successfully",
        data: result,
    });
});
// admin.controller.ts
const getAllGear = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllGear();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All gear retrieved successfully",
        data: result,
    });
});
const getAllRentals = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllRentals();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All rentals retrieved successfully",
        data: result,
    });
});
;
exports.AdminController = {
    getAllUsers,
    getSingleUser,
    updateUserStatus,
    getAllGear,
    getAllRentals,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const register = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.register(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.login(req.body);
    // We'll set the refresh token cookie here later
    // res.cookie("refreshToken", result.refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    const result = await auth_service_1.AuthService.refreshToken(refreshToken);
    // We'll update the cookie here later if needed
    // res.cookie("refreshToken", result.refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Access token generated successfully",
        data: result,
    });
});
const logout = (0, catchAsync_1.default)(async (_req, res) => {
    res.clearCookie("refreshToken");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Logged out successfully",
        data: null,
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.getMe(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});
exports.AuthController = {
    register,
    login,
    refreshToken,
    logout,
    getMe,
};

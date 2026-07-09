"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const review_service_1 = require("./review.service");
const createReview = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const result = await review_service_1.ReviewService.createReview(customerId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Review created successfully",
        data: result,
    });
});
const getGearReviews = (0, catchAsync_1.default)(async (req, res) => {
    const gearId = req.params.gearId;
    const result = await review_service_1.ReviewService.getGearReviews(gearId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reviews retrieved successfully",
        data: result,
    });
});
const getMyReviews = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const result = await review_service_1.ReviewService.getMyReviews(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My reviews retrieved successfully",
        data: result,
    });
});
const updateReview = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const reviewId = req.params.id;
    const result = await review_service_1.ReviewService.updateReview(customerId, reviewId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review updated successfully",
        data: result,
    });
});
const deleteReview = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.id;
    const reviewId = req.params.id;
    await review_service_1.ReviewService.deleteReview(customerId, reviewId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review deleted successfully",
        data: null,
    });
});
exports.ReviewController = {
    createReview,
    getGearReviews,
    getMyReviews,
    updateReview,
    deleteReview,
};

import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;

  const result = await ReviewService.createReview(customerId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getGearReviews = catchAsync(async (req: Request, res: Response) => {
const gearId = req.params.gearId as string;

const result = await ReviewService.getGearReviews(gearId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;

  const result = await ReviewService.getMyReviews(customerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My reviews retrieved successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
  const reviewId = req.params.id as string;

  const result = await ReviewService.updateReview(
    customerId,
    reviewId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
  const reviewId = req.params.id as string;

  await ReviewService.deleteReview(customerId, reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    data: null,
  });
});

export const ReviewController = {
  createReview,
  getGearReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
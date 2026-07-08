import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ProviderRentalService } from "./provider.rental.service";

const getProviderOrders = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;

  const result = await ProviderRentalService.getProviderOrders(providerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental orders retrieved successfully",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;
  const orderId = req.params.id as string;

  const result = await ProviderRentalService.getProviderOrderById(
    providerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental order retrieved successfully",
    data: result,
  });
});

const acceptRental = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;
  const orderId = req.params.id as string;

  const result = await ProviderRentalService.acceptRental(
    providerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental accepted successfully",
    data: result,
  });
});

const rejectRental = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;
  const orderId = req.params.id as string;

  const result = await ProviderRentalService.rejectRental(
    providerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental rejected successfully",
    data: result,
  });
});

const startRental = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;
  const orderId = req.params.id as string;

  const result = await ProviderRentalService.startRental(
    providerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental started successfully",
    data: result,
  });
});

const completeRental = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;
  const orderId = req.params.id as string;

  const result = await ProviderRentalService.completeRental(
    providerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental completed successfully",
    data: result,
  });
});

export const ProviderRentalController = {
  getProviderOrders,
  getSingleOrder,
  acceptRental,
  rejectRental,
  startRental,
  completeRental,
};
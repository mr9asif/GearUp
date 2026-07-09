import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CustomerRentalService } from "./customer.rental.service";

const createRental = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;

  const result = await CustomerRentalService.createRental(
    customerId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Rental order placed successfully",
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;

  const result = await CustomerRentalService.getMyOrders(customerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental orders retrieved successfully",
    data: result,
  });
});

const getMyOrderById = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
const orderId = req.params.id as string;

  const result = await CustomerRentalService.getMyOrderById(
    customerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental order retrieved successfully",
    data: result,
  });
});

const cancelRental = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
const orderId = req.params.id as string;

  const result = await CustomerRentalService.cancelRental(
    customerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental order cancelled successfully",
    data: result,
  });
});


// track status
const getRentalStatus = catchAsync(async (req, res) => {
  const customerId = req.user.id;
  const rentalId = req.params.id as string;

  const result = await CustomerRentalService.getRentalStatus(
    customerId,
    rentalId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental status retrieved successfully",
    data: result,
  });
});

// payment status
const getPaymentStatus = catchAsync(async (req, res) => {
  const customerId = req.user.id;
  const rentalId = req.params.id as string;

  const result = await CustomerRentalService.getPaymentStatus(
    customerId,
    rentalId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment status retrieved successfully",
    data: result,
  });
});

export const CustomerRentalController = {
  createRental,
  getMyOrders,
  getMyOrderById,
  cancelRental,
  getRentalStatus,
   getPaymentStatus,
};
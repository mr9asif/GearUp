import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
  const { orderId } = req.body;

  const result = await PaymentService.createCheckoutSession(
    customerId,
    orderId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Checkout session created successfully",
    data: result,
  });
});

const confirmPayment = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;

  const result = await PaymentService.confirmPayment(
    signature,
    req.body as Buffer
  );

  return res.status(httpStatus.OK).json(result);
};

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;

  const result = await PaymentService.getMyPayments(customerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
  const paymentId = req.params.id as string;

  const result = await PaymentService.getPaymentById(
    customerId,
    paymentId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
};
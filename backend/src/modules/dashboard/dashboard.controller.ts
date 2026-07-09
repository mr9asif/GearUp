import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardService } from "./dashboard.service";

const getProviderDashboard = catchAsync(
  async (req: Request, res: Response) => {
    const providerId = req.user.id;

    const result = await DashboardService.getProviderDashboard(providerId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Provider dashboard retrieved successfully",
      data: result,
    });
  }
);

const getCustomerDashboard = catchAsync(
  async (req: Request, res: Response) => {
    const customerId = req.user.id;

    const result = await DashboardService.getCustomerDashboard(customerId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customer dashboard retrieved successfully",
      data: result,
    });
  }
);




export const DashboardController = {
  getProviderDashboard,
  getCustomerDashboard,

};
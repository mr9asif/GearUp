import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GearService } from "./gear.service";

const createGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;

  const result = await GearService.createGear(providerId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Gear created successfully",
    data: result,
  });
});

const getAllGear = catchAsync(async (req: Request, res: Response) => {
  const result = await GearService.getAllGear(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gear retrieved successfully",
    data: result,
  });
});

const getSingleGear = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await GearService.getSingleGear(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gear retrieved successfully",
    data: result,
  });
});

const getMyGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;

  const result = await GearService.getMyGear(providerId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Provider gear retrieved successfully",
    data: result,
  });
});

const getMySingleGear = catchAsync(
  async (req: Request, res: Response) => {
    const providerId = req.user.id;
    const gearId = req.params.id as string;

    const result = await GearService.getMySingleGear(
      providerId,
      gearId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Gear retrieved successfully",
      data: result,
    });
  }
);

const updateGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;
  const gearId = req.params.id as string;

  const result = await GearService.updateGear(
    providerId,
    gearId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gear updated successfully",
    data: result,
  });
});

const deleteGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user.id;
  const gearId = req.params.id as string;

  await GearService.deleteGear(providerId, gearId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gear deleted successfully",
    data: null,
  });
});

export const GearController = {
  createGear,
  getAllGear,
  getSingleGear,
  getMyGear,
  getMySingleGear,
  updateGear,
  deleteGear,
};
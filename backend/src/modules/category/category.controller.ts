import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  console.log(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  }
);

const getSingleCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = await CategoryService.getSingleCategory(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category retrieved successfully",
      data: result,
    });
  }
);

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await CategoryService.updateCategory(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await CategoryService.deleteCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully",
    data: null,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
import { Request, Response } from "express";
import { CategoryService, registerUserService } from "./auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body);
    console.log(req.body)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error,
     
    });
  }
};


const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const CategoryController = {
  createCategory,
};
import express from "express";


import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import { Role } from "../../generated/prisma";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all categories
router.get("/", CategoryController.getAllCategories);

// Get single category
router.get("/:id", CategoryController.getSingleCategory);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Create category
router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory
);

// Update category
router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryController.updateCategory
);

// Delete category
router.delete(
  "/:id",
  auth(Role.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
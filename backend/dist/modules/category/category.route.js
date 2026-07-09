"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const prisma_1 = require("../../generated/prisma");
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
// Get all categories
router.get("/", category_controller_1.CategoryController.getAllCategories);
// Get single category
router.get("/:id", category_controller_1.CategoryController.getSingleCategory);
/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
// Create category
router.post("/", (0, auth_1.default)(prisma_1.Role.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryValidationSchema), category_controller_1.CategoryController.createCategory);
// Update category
router.patch("/:id", (0, auth_1.default)(prisma_1.Role.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryValidationSchema), category_controller_1.CategoryController.updateCategory);
// Delete category
router.delete("/:id", (0, auth_1.default)(prisma_1.Role.ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;

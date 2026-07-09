"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../generated/prisma");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
// Customer Routes
router.post("/create", (0, auth_1.default)(prisma_1.Role.CUSTOMER), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.createReviewSchema), review_controller_1.ReviewController.createReview);
router.get("/my", (0, auth_1.default)(prisma_1.Role.CUSTOMER), review_controller_1.ReviewController.getMyReviews);
router.patch("/:id", (0, auth_1.default)(prisma_1.Role.CUSTOMER), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.updateReviewSchema), review_controller_1.ReviewController.updateReview);
router.delete("/:id", (0, auth_1.default)(prisma_1.Role.CUSTOMER), review_controller_1.ReviewController.deleteReview);
// Public Route
router.get("/gear/:gearId", review_controller_1.ReviewController.getGearReviews);
exports.ReviewRoutes = router;

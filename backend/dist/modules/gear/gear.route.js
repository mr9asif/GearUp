"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearRoutes = void 0;
const express_1 = __importDefault(require("express"));
const gear_controller_1 = require("./gear.controller");
const router = express_1.default.Router();
router.get("/", gear_controller_1.GearController.getAllGear);
router.get("/all", gear_controller_1.GearController.getAllGearFilter);
router.get("/:id", gear_controller_1.GearController.getSingleGear);
exports.GearRoutes = router;

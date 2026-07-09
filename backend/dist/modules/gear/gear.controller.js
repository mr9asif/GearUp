"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const gear_service_1 = require("./gear.service");
const createGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const result = await gear_service_1.GearService.createGear(providerId, req.body, req.files);
    console.log(req.files);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Gear created successfully",
        data: result,
    });
});
const getAllGear = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearService.getAllGear(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Gear retrieved successfully",
        data: result,
    });
});
const getSingleGear = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await gear_service_1.GearService.getSingleGear(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Gear retrieved successfully",
        data: result,
    });
});
const getMyGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const result = await gear_service_1.GearService.getMyGear(providerId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Provider gear retrieved successfully",
        data: result,
    });
});
const getMySingleGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const gearId = req.params.id;
    const result = await gear_service_1.GearService.getMySingleGear(providerId, gearId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Gear retrieved successfully",
        data: result,
    });
});
const updateGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const gearId = req.params.id;
    console.log("update", req.body);
    const result = await gear_service_1.GearService.updateGear(providerId, gearId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Gear updated successfully",
        data: result,
    });
});
const deleteGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.id;
    const gearId = req.params.id;
    await gear_service_1.GearService.deleteGear(providerId, gearId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Gear deleted successfully",
        data: null,
    });
});
const getAllGearFilter = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearService.getAllGearService(req.query);
    console.log(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Gear retrieved successfully",
        data: result.data,
    });
});
exports.GearController = {
    createGear,
    getAllGear,
    getSingleGear,
    getMyGear,
    getMySingleGear,
    updateGear,
    deleteGear,
    getAllGearFilter
};

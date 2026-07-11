"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Apperror_1 = __importDefault(require("./Apperror"));
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof Apperror_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
    if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Token has expired",
        });
    }
    console.error(err);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
exports.default = globalErrorHandler;

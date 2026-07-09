"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const Apperror_1 = __importDefault(require("../error/Apperror"));
const jwt_1 = require("../utils/jwt");
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Apperror_1.default(http_status_1.default.UNAUTHORIZED, "Access token is missing");
        }
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        const decoded = (0, jwt_1.verifyToken)(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        if (requiredRoles.length &&
            !requiredRoles.includes(decoded.role)) {
            throw new Apperror_1.default(http_status_1.default.FORBIDDEN, "Forbidden access");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;

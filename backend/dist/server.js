"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./config/prisma");
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        await prisma_1.prisma.$connect();
        console.log("✅ Database connected");
        app_1.default.listen(5000, () => {
            console.log("🚀 Server running on port 5000");
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to database:", error);
        process.exit(1);
    }
}
startServer();

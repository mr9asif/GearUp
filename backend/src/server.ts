import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { prisma } from "./config/prisma";

const PORT = process.env.PORT || 5000;



async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
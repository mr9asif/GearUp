import express from "express";
import { prisma } from "./config/prisma";



const app = express();

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "GearUp API is running 🚀",
  });
});


export const startServer=async()=> {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL Connected");


  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
}


export default app;
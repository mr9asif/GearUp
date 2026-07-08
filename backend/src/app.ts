import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { prisma } from "./config/prisma";
import { AdminRoutes } from "./modules/admin/admin.route";
import { AuthRoutes } from "./modules/auth/auth.route";


const app:Application = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.get("/asif", (_, res) => {
  res.json({
    success: true,
    message: "GearUp API is running 🚀",
  });
});


app.use('/api/auth', AuthRoutes)
app.use('/api/admin', AdminRoutes)

export const startServer=async()=> {
  try {
    await prisma.$connect();
    console.log(process.env.DATABASE_URL);

    console.log("✅ PostgreSQL Connected");


  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
}


export default app;
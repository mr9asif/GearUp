import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import { prisma } from "./config/prisma";
import globalErrorHandler from "./error/globlalErrorHandler";
import { AdminRoutes } from "./modules/admin/admin.route";
import { AuthRoutes } from "./modules/auth/auth.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { DashboardRoutes } from "./modules/dashboard/dashboard.route";
import { GearRoutes } from "./modules/gear/gear.route";
import { ProviderGearRoutes } from "./modules/gear/providerGear.route";
import { PaymentRoutes } from "./modules/payment/payment.route";
import { RentalRoutes } from "./modules/rental/rental.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { ProfileRoute } from "./modules/user/user.route";

const app:Application = express();

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(
  "/api/payments/confirm",
  express.raw({ type: "application/json" })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "GearUp API is running 🚀",
  });
});


app.use('/api/auth', AuthRoutes)
app.use('/api/admin', AdminRoutes)
app.use("/api/categories", CategoryRoutes);
app.use("/api/gear", GearRoutes);
app.use("/api/provider/gear", ProviderGearRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/rentals", RentalRoutes);
app.use("/api/reviews", ReviewRoutes)
app.use("/api/dashboard", DashboardRoutes)
app.use("/api/profile", ProfileRoute)


app.use(globalErrorHandler);

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
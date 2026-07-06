import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "GearUp API is running 🚀",
  });
});

export default app;
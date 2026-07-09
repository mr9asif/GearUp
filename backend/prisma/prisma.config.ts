import "dotenv/config";
import { defineConfig } from "prisma/config";
console.log("DATABASE_URL:", process.env.DATABASE_URL);
export default defineConfig({
  schema: "./schema.prisma",

  migrations: {
    path: "./migrations",
     seed: "tsx prisma/seed.ts",
  },

  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
import bcrypt from "bcrypt";
import "dotenv/config";
import { prisma } from "../src/config/prisma";
import { Role } from "../src/generated/prisma";

async function main() {
  const adminName = process.env.ADMIN_NAME!;
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;
  const adminPhone = process.env.ADMIN_PHONE!;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env");
  }

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      phone: adminPhone,
      role: Role.ADMIN,
    },
  });

  console.log("✅ Admin created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
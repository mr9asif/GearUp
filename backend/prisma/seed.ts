
import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";
import { Role } from "../src/generated/prisma";


async function main() {
  const adminEmail = "admin@gearup.com";

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@1234", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
     phone: "01792952161",
      role: Role.ADMIN,
    },
  });

  console.log("✅ Admin created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
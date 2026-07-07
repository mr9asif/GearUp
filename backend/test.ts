// test.ts

import { prisma } from "./src/config/prisma";



async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
#!/usr/bin/env node
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
     const email = process.env.ADMIN_EMAIL || "admin@example.com";
     const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
     const name = process.env.ADMIN_NAME || "Site Admin";

     if (!email || !password) {
          console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables or edit the script.");
          process.exit(1);
     }

     const hashed = await bcrypt.hash(password, 10);

     const user = await prisma.user.upsert({
          where: { email },
          update: { name, password: hashed, role: "ADMIN" },
          create: { email, name, password: hashed, role: "ADMIN" },
     });

     console.log("Admin created/updated:", { id: user.id, email: user.email });
}

main()
     .catch((e) => {
          console.error(e);
          process.exit(1);
     })
     .finally(async () => {
          await prisma.$disconnect();
     });

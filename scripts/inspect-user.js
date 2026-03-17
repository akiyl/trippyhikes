#!/usr/bin/env node
import { prisma } from '../lib/prisma';

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/inspect-user.js <email>');
    process.exit(1);
  }
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user ? { id: user.id, email: user.email, role: user.role } : null);
}

main().finally(() => prisma.$disconnect());

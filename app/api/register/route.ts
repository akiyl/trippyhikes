import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const { email, password, name, role } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: role || "USER",
    },
  });

  return new Response(JSON.stringify(user), { status: 201 });
}

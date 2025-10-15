import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

// Note: this handler expects a JSON body for POST to create a Destination
export async function POST(req: Request) {
  const session = (await getServerSession(
    authOptions as any
  )) as Session | null;
  if (!session || (session as any).user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  try {
    const created = await prisma.destination.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = (await getServerSession(
    authOptions as any
  )) as Session | null;
  if (!session || (session as any).user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Expect ?id=123 or JSON body { id }
  const url = new URL(req.url);
  const idParam = url.searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : null;

  try {
    if (!id) {
      const body = await req.json();
      if (!body?.id)
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
      await prisma.destination.delete({ where: { id: Number(body.id) } });
      return NextResponse.json({ success: true });
    }

    await prisma.destination.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = (await getServerSession(
    authOptions as any
  )) as Session | null;
  if (!session || (session as any).user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const items = await prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 }
    );
  }
}

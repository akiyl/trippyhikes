import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  const session = (await getServerSession(
    authOptions as any,
  )) as Session | null;
  if (!session || (session as any).user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  try {
    const created = await prisma.gallery.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create gallery item" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = (await getServerSession(
    authOptions as any,
  )) as Session | null;
  if (!session || (session as any).user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await prisma.gallery.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete gallery item" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const session = (await getServerSession(
    authOptions as any,
  )) as Session | null;
  if (!session || (session as any).user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const items = await prisma.gallery.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load gallery items" },
      { status: 500 },
    );
  }
}

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
  // Basic validation to avoid Prisma 500s from missing required fields
  if (!body?.trek || !body?.QuickItinerary || !body?.DetailedItinerary) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: trek, QuickItinerary, DetailedItinerary",
      },
      { status: 400 },
    );
  }

  try {
    const created = await prisma.itienary.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    // Log full error on server so it's visible in server logs
    console.error("/api/admin/itienary POST error:", err);
    const message = err?.message || "Failed to create itinerary item";
    return NextResponse.json({ error: message }, { status: 500 });
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
    await prisma.itienary.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("/api/admin/itienary DELETE error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete itinerary item" },
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
    const items = await prisma.itienary.findMany({ orderBy: { trek: "asc" } });
    return NextResponse.json(items);
  } catch (err: any) {
    console.error("/api/admin/itienary GET error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to load itinerary items" },
      { status: 500 },
    );
  }
}

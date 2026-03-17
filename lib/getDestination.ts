// lib/data.ts
import { prisma } from "@/lib/prisma";
import { cache } from "react";

// 🧭 Get all destinations using Prisma
export const getDestinations = cache(async () => {
  try {
    return await prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e: any) {
    console.error("[getDestinations] Prisma error:", e?.message || e);
    // Return empty array as a safe fallback so prerender/build doesn't fail
    return [];
  }
});

// 🧭 Get destinations filtered by trailType using Prisma
export const getDestinationsByTrailType = cache(async (trailType: string) => {
  try {
    return await prisma.destination.findMany({
      where: { trailType },
      orderBy: { createdAt: "desc" },
    });
  } catch (e: any) {
    console.error(
      "[getDestinationsByTrailType] Prisma error:",
      e?.message || e,
    );
    return [];
  }
});

// 🧭 Get single destination by slug or ID
// 🧭 Get single destination by slug
export const getDestinationBySlug = cache(async (slugOrId: string) => {
  try {
    const isNumeric = /^\d+$/.test(slugOrId);

    return await prisma.destination.findUnique({
      where: isNumeric ? { id: Number(slugOrId) } : { slug: slugOrId },
      include: { Review: true },
    });
  } catch (e: any) {
    console.error("[getDestinationBySlug] Prisma error:", e?.message || e);
    return null;
  }
});

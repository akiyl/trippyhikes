// lib/data.ts
import { prisma } from "@/lib/prisma";
import { cache } from "react";

// 🧭 Get all destinations
export const getDestinations = cache(async () => {
  return prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });
});

// 🧭 Get destinations filtered by trailType
export const getDestinationsByTrailType = cache(async (trailType: string) => {
  return prisma.destination.findMany({
    where: { trailType },
    orderBy: { createdAt: "desc" },
  });
});

// 🧭 Get single destination by slug or ID
// 🧭 Get single destination by slug
export const getDestinationBySlug = cache(async (slugOrId: string) => {
  const isNumeric = /^\d+$/.test(slugOrId);

  return prisma.destination.findUnique({
    where: isNumeric ? { id: Number(slugOrId) } : { slug: slugOrId },
    include: { Review: true },
  });
});

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
export const getDestinationBySlug = cache(async (id: number) => {
  return prisma.destination.findUnique({
    where: { id }, // use the unique id field
  });
});

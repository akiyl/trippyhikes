// lib/data.ts
import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🧭 Get all destinations
export const getDestinations = cache(async () => {
  try {
    const { data, error } = await supabase
      .from("Destination")
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) {
      console.error("[getDestinations] supabase error", error.message);
      return [];
    }
    return data || [];
  } catch (e: any) {
    console.error("[getDestinations] Prisma error:", e?.message || e);
    // Return empty array as a safe fallback so prerender/build doesn't fail
    return [];
  }
});

// 🧭 Get destinations filtered by trailType
export const getDestinationsByTrailType = cache(async (trailType: string) => {
  try {
    const { data, error } = await supabase
      .from("Destination")
      .select("*")
      .eq("trailType", trailType)
      .order("createdAt", { ascending: false });
    if (error) {
      console.error(
        "[getDestinationsByTrailType] supabase error",
        error.message
      );
      return [];
    }
    return data || [];
  } catch (e: any) {
    console.error(
      "[getDestinationsByTrailType] Prisma error:",
      e?.message || e
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

export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma.js";
import { Calendar, Mountain, Star } from "lucide-react";
import { Destination } from "@prisma/client";
import SchedulePlannerClient from "../components/SchedulePlanner";

export default async function TreksPage() {
  let treks: Destination[] = [];
  try {
    treks = await prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e: any) {
    console.error("[TreksPage] Prisma error:", e?.message || e);
    treks = [];
  }

  if (!treks || treks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        No treks available yet.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mt-20 mx-auto px-6 py-12">
      <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        Explore Our Epic Treks
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {treks.map((trek) => (
          <Link
            key={trek.id}
            href={`/treks/${trek.slug}`}
            className="relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-xl transition-shadow duration-500 cursor-pointer"
          >
            {/* Trek Image */}
            <div className="relative h-72 w-full overflow-hidden">
              <Image
                src={trek.imageSrc || "/placeholder.jpg"}
                alt={trek.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Trek Info */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 
             bg-gradient-to-t from-black/80 via-black/30 to-transparent 
             backdrop-blur-md text-white transition-all duration-500
             group-hover:backdrop-blur-sm group-hover:bg-black/50"
            >
              <h2 className="text-2xl font-bold mb-1 line-clamp-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                {trek.name}
              </h2>
              <p className="flex items-center text-sm text-gray-300 gap-2 mb-3">
                <Mountain className="w-4 h-4 text-green-400" /> {trek.region}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1 bg-green-500/30 text-green-200 px-2 py-1 rounded-full font-medium">
                  <Calendar className="w-3 h-3" /> {trek.duration}
                </span>
                <span className="flex items-center gap-1 bg-blue-500/30 text-blue-200 px-2 py-1 rounded-full font-medium">
                  ${trek.price.toFixed(0)}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 3 ? "text-yellow-400" : "text-gray-600/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

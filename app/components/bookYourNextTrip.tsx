// components/BookYourNextTrip.tsx
"use client";

import { Destination } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Clock, ArrowRight, Star } from "lucide-react";

type Props = { destinations: Destination[] };

function DifficultyBadge({ grade }: { grade: string }) {
  const colorMap: Record<string, string> = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    difficult: "bg-red-100 text-red-800",
  };
  const key = grade.toLowerCase().includes("difficult")
    ? "difficult"
    : grade.toLowerCase().includes("moderate")
      ? "moderate"
      : "easy";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorMap[key]}`}>
      {grade}
    </span>
  );
}

export default function BookYourNextTrip({ destinations }: Props) {
  const categories = [
    "Valley trek",
    "Summit trek",
    "Summer",
    "Winter",
    "Monsoon",
    "solo trek",
    "family trek",
    "PanchKedar trek",
    "college trek",
  ];
  const [activeCategory, setActiveCategory] = useState("Valley trek");

  const filtered = destinations.filter((d) => {
    const cat = activeCategory.toLowerCase();
    return (
      d.trailType?.toLowerCase() === cat ||
      d.season?.toLowerCase().includes(cat)
    );
  });

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-900 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#fb8500]">
        Book your Next Trip
      </h2>
      <p className="text-slate-300 mb-8 max-w-xl">
        Explore handpicked treks crafted for every kind of adventurer.
      </p>

      <div className="flex flex-wrap gap-5 mb-10 border-b border-white/10 pb-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`min-w-fit pb-2 text-base sm:text-lg font-medium transition ${
              activeCategory === cat
                ? "text-[#fb8500] border-b-2 border-[#fb8500]"
                : "text-white/60 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((dest) => (
          <Link key={dest.id} href={`/treks/${dest.id}`} className="group">
            <div className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={dest.imageSrc}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900">
                  ₹{dest.price}
                </div>
                {dest.grade && (
                  <div className="absolute bottom-3 left-3">
                    <DifficultyBadge grade={dest.grade} />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#fb8500] transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-1 mt-1.5 text-slate-500 text-sm">
                  <MapPin size={14} />
                  <span>{dest.region}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                  {dest.duration && (
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {dest.duration}
                    </span>
                  )}
                  {dest.distance && (
                    <span>{dest.distance} km</span>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-[#fb8500]">
                  <span>View details</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
export { BookYourNextTrip };

// components/BookYourNextTrip.tsx
"use client";

import { Destination } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = { destinations: Destination[] };

export default function BookYourNextTrip({ destinations }: Props) {
  const categories = [
    "Valley trek",
    "Summit trek",
    "Wildlife",
    "Frozen river trail",
  ];
  const [activeCategory, setActiveCategory] = useState("Valley trek");

  const filtered = destinations.filter(
    (d) => d.trailType?.toLowerCase() === activeCategory.toLowerCase(),
  );

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-900 text-black">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        Book your Next Trip
      </h2>

      <div className="flex flex-wrap gap-3 mb-8 border-b border-slate-200 pb-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`min-w-fit pb-2 text-base sm:text-lg font-medium transition ${
              activeCategory === cat
                ? "text-white border-b-2 border-white"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-black">
        {filtered.map((dest) => (
          <Link key={dest.id} href={`/treks/${dest.id}`}>
            <div className="overflow-hidden rounded-3xl shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-64 w-full">
                <Image
                  src={dest.imageSrc}
                  alt={dest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {dest.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  {dest.region}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
export { BookYourNextTrip };

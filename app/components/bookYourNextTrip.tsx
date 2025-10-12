// components/BookYourNextTrip.tsx
"use client";

import { Destination } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = { destinations: Destination[] };

export default function BookYourNextTrip({ destinations }: Props) {
  const categories = [
    "Valley trail",
    "Mountain trail",
    "Wildlife",
    "Frozen river trail",
  ];
  const [activeCategory, setActiveCategory] = useState("Valley trail");

  const filtered = destinations.filter(
    (d) => d.trailType?.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <section className="py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Book your Next Trip</h2>

      <div className="flex gap-6 mb-8 border-b pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-2 text-lg font-medium ${
              activeCategory === cat
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <Link key={dest.id} href={`/treks/${dest.id}`}>
            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
              <div className="relative h-48 w-full">
                <Image
                  src={dest.imageSrc}
                  alt={dest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{dest.name}</h3>
                <p className="text-gray-600">{dest.region}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
export { BookYourNextTrip };

// components/WinterSpecial.tsx
import { prisma } from "@/lib/prisma";

import Image from "next/image";

export default async function WinterSpecial() {
  const treks = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
    where: { season: "Winter" },
    take: 6,
  });

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-4">Winter Special</h2>

      {/* Subheading */}
      <p className="text-gray-600 text-center mt-2 mb-10">
        Plan, book, and embark on your dream adventure with our expert guidance
        and tailored experiences.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {treks.map((trip) => (
          <div
            key={trip.region}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={trip.imageSrc}
                alt={trip.name}
                fill
                className="object-cover"
              />
              {trip.trailType && (
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                    trip.trailType === "Popular"
                      ? "bg-yellow-500 text-white"
                      : trip.trailType === "New"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {trip.trailType}
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
              <h3 className="text-lg font-semibold">{trip.name}</h3>
              <p className="text-sm">${trip.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { WinterSpecial };

"use client";

import { Destination } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  destinations: Destination[];
};

export default function ImageGallery({ destinations }: Props) {
  if (!destinations || destinations.length === 0)
    return <p className="text-center text-gray-500">No images available.</p>;

  // Limit the number of images displayed
  const limitedDestinations = destinations.slice(0, 13);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Explore Our Gallery
      </h2>

      {/* Masonry Layout */}
      <div
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          gap-4
          space-y-4
        "
      >
        {limitedDestinations.map((dest) => (
          <div
            key={dest.id}
            className="relative overflow-hidden rounded-2xl break-inside-avoid group"
          >
            <Image
              src={dest.imageSrc}
              alt={dest.name}
              width={800}
              height={600}
              className="
                w-full h-auto object-cover rounded-2xl
                transition-transform duration-300 ease-in-out
                group-hover:scale-105
              "
            />

            {/* Overlay */}
            <div
              className="
              absolute inset-0 bg-black/40 opacity-0
              group-hover:opacity-100 transition-opacity duration-300
              flex flex-col justify-end p-4 rounded-2xl
            "
            >
              <h3 className="text-white text-lg font-semibold">{dest.name}</h3>
              {dest.region && (
                <p className="text-gray-200 text-sm">{dest.region}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {destinations.length > 8 && (
        <div className="flex justify-center mt-10">
          <Link href="/gallery">
            <button
              className="
                relative overflow-hidden px-6 py-3
                rounded-full border border-white/20 backdrop-blur-md
                bg-black text-white font-medium
                transition-all duration-300 ease-in-out
                hover:bg-black/80 hover:scale-105 hover:shadow-lg
              "
            >
              <span className="relative z-10">See More</span>

              {/* Subtle gradient shimmer effect */}
              <span
                className="
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                  translate-x-[-100%] animate-[shine_2s_infinite]
                "
              />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}

// Add shimmer animation
// You can put this in your globals.css if not already
/*
@keyframes shine {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}
*/

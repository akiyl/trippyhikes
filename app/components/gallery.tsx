"use client";

import { Destination } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Masonry from "./ui/masonary";
import { getDestinations } from "@/lib/getDestination";
type Props = {
  destinations: Destination[];
};

export default function ImageGallery({ destinations }: Props) {
  if (!destinations || destinations.length === 0)
    return <p className="text-center text-gray-300">No images available.</p>;

  // Limit the number of images displayed
  const limitedDestinations = destinations.slice(0, 18);
  const items = limitedDestinations.map((dest) => ({
    id: String(dest.id),
    img: dest.imageSrc,
    url: dest.name,
    height: dest.height,
  }));
  return (
    <section className="w-full relative mx-auto px-4 py-12 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Explore Our Gallery
      </h2>

      {/* Masonry Layout */}
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
        minColumnWidth={150} // ensure each tile is at least 150px wide
      />

      {/* See More Button */}
      {destinations.length > 8 && (
        <div className="flex justify-center mt-10">
          <Link href="/treks">
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

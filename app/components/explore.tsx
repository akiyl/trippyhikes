"use client";

import { useEffect, useState } from "react";
import type { Destination } from "@prisma/client";

const GridLayout = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const gridClasses = [
    "col-span-8 row-span-2",
    "col-span-4 row-span-1",
    "col-span-4 row-span-1",
    "col-span-4 row-span-1",
    "col-span-4 row-span-1",
    "col-span-4 row-span-1",
    "col-span-8 row-span-1",
  ];

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const response = await fetch("/api/destinations");
        const data: Destination[] = await response.json();
        setDestinations(data.slice(0, 7));
      } catch (error) {
        console.error("Failed to load destinations:", error);
      }
    };

    loadDestinations();
  }, []);

  return (
    <section className="w-full p-4 bg-black">
      <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
        {destinations.map((dest, index) => {
          const gridClass = gridClasses[index] || "col-span-4 row-span-1";
          return (
            <div
              key={dest.id}
              className={`${gridClass} relative overflow-hidden group`}
            >
              <img
                src={dest.imageSrc}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <Overlay title={dest.name} subtitle="Explore" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Overlay = ({ title, subtitle }: any) => {
  return (
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500 flex flex-col justify-end p-6 text-white">
      <p className="text-sm opacity-80 tracking-wide">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-light transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        {title}
      </h2>
    </div>
  );
};

export default GridLayout;

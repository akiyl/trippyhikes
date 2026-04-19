import Image from "next/image";
import { Destination } from "@prisma/client";

type props = {
  destination: Destination[];
};
export default function PopularLocations({ destination }: props) {
  const filteredLocations = destination.slice(0, 6);
  return (
    <section className="w-full mx-auto px-4 py-12 sm:px-6 lg:px-8 my-16">
      <div className="mx-auto max-w-6xl text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Explore All Popular Locations
        </h2>
        <p className="text-slate-300 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
          Plan, book, and embark on your dream adventure with our expert
          guidance and tailored experiences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filteredLocations.map((dest) => (
          <div
            key={dest.id}
            className="relative overflow-hidden rounded-3xl shadow-2xl bg-black"
          >
            <Image
              src={dest.imageSrc}
              alt={dest.name}
              width={500}
              height={400}
              className="object-cover w-full h-64 sm:h-72 md:h-80 transition-transform duration-500 ease-out hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 text-white text-xl sm:text-2xl font-semibold drop-shadow-lg">
              {dest.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

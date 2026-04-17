import Image from "next/image";
import { Destination } from "@prisma/client";

type props = {
  destination: Destination[];
};
export default function PopularLocations({ destination }: props) {
  const filteredLocations = destination.slice(0, 6);
  return (
    <section className="w-full h-[75vh] mx-auto px-10 py-12 my-16  ">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white">
          Explore All Popular Locations
        </h2>
        <p className="text-gray-300 mt-2">
          Plan, book, and embark on your dream adventure with our expert
          guidance and tailored experiences.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredLocations.map((dest) => (
          <div
            key={dest.id}
            className="relative rounded-xl overflow-hidden group shadow-lg bg-black"
          >
            {/* Background Image */}
            <Image
              src={dest.imageSrc}
              alt={dest.name}
              width={500}
              height={400}
              className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500 opacity-95"
            />

            {/* Text Overlay */}
            <div className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
              {dest.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import { Destination } from "@prisma/client";
type Location = {
  name: string;
  image: string;
};

const locations: Location[] = [
  { name: "Ali Bugyal", image: "/image/ali.webp" },
  { name: "Har ki doon", image: "/image/har-ki-doon.jpg" },
  { name: "Kedarkantha", image: "/image/kedarkantha.jpg" },
];

type props = {
  destination: Destination[];
};
export default function PopularLocations({ destination }: props) {
  const filteredLocations = destination.slice(0, 3);
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Explore All Popular Locations</h2>
        <p className="text-gray-600 mt-2">
          Plan, book, and embark on your dream adventure with our expert
          guidance and tailored experiences.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredLocations.map((dest) => (
          <div
            key={dest.id}
            className="relative rounded-xl overflow-hidden group shadow-lg"
          >
            {/* Background Image */}
            <Image
              src={dest.imageSrc}
              alt={dest.name}
              width={500}
              height={400}
              className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
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

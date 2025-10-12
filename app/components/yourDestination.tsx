import Image from "next/image";

type Location = {
  name: string;
  image: string;
};

const locations: Location[] = [
  { name: "Ali Bugyal", image: "/image/ali.webp" },
  { name: "Har ki doon", image: "/image/har-ki-doon.jpg" },
  { name: "Kedarkantha", image: "/image/kedarkantha.jpg" },
];

export default function PopularLocations() {
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
        {locations.map((loc, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden group shadow-lg"
          >
            {/* Background Image */}
            <Image
              src={loc.image}
              alt={loc.name}
              width={500}
              height={400}
              className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Text Overlay */}
            <div className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
              {loc.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

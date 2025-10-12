// components/WinterSpecial.tsx
"use client";

import Image from "next/image";

type WinterTrip = {
  country: string;
  price: string;
  image: string;
  tag?: string;
  tagColor?: string;
};

const trips: WinterTrip[] = [
  { country: "Nepal", price: "From $500-1000", image: "/images/nepal.jpg" },
  {
    country: "Switzerland",
    price: "From $300-700",
    image: "/images/switzerland.jpg",
    tag: "Exclusive Trip in this winter",
    tagColor: "bg-pink-500",
  },
  { country: "Tibet", price: "From $500-1000", image: "/images/tibet.jpg" },
  {
    country: "Kashmir",
    price: "From $500-1000",
    image: "/images/kashmir.jpg",
    tag: "Save 20% today",
    tagColor: "bg-yellow-400 text-black",
  },
  {
    country: "South Korea",
    price: "From $500-1000",
    image: "/images/southkorea.jpg",
    tag: "Save 30% today",
    tagColor: "bg-yellow-400 text-black",
  },
];

export default function WinterSpecial() {
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
        {trips.map((trip) => (
          <div
            key={trip.country}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={trip.image}
                alt={trip.country}
                fill
                className="object-cover"
              />
              {trip.tag && (
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                    trip.tagColor || "bg-green-500 text-white"
                  }`}
                >
                  {trip.tag}
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
              <h3 className="text-lg font-semibold">{trip.country}</h3>
              <p className="text-sm">{trip.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// export { WinterSpecial };

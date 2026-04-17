// components/TrendingTreks.tsx
import { getDestinations } from "@/lib/getDestination";
import type { Destination } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import SplitText from "./ui/SplitText";
import AutoSplitOnScroll from "./ui/AutoSplitOnScroll";

export default async function TrendingTreks() {
  const allTreks = (await getDestinations()) as Destination[];
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  // Filter treks by current month
  const filteredTreks = allTreks.filter(
    (trek: Destination) => trek.month && trek.month.includes(currentMonth),
  );

  // Define month order for sorting
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sort treks by month
  const sortedTreks = filteredTreks.sort((a, b) => {
    const aIndex = a.month ? monthOrder.indexOf(a.month) : -1;
    const bIndex = b.month ? monthOrder.indexOf(b.month) : -1;
    return aIndex - bIndex;
  });

  // Take first 6
  const treks = sortedTreks.slice(0, 6);

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      {/* Animated Heading */}
      <div className="text-center mb-4">
        <SplitText
          text="Trending Treks"
          type="words"
          className="text-3xl font-bold text-black"
          stagger={0.1}
        />
      </div>

      {/* Animated Subheading */}
      <div className="text-center mt-2 mb-10">
        <SplitText
          text="Discover the most sought-after adventures that adventurers can't stop talking about"
          type="words"
          className="text-black"
          stagger={0.05}
        />
      </div>

      {/* Cards with Scroll Animation */}
      <AutoSplitOnScroll />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {treks.map((trip, index) => (
          <Link key={trip.id} href={`/treks/${trip.slug || trip.id}`}>
            <div
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={trip.imageSrc}
                  alt={trip.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {trip.trailType && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg">
                    🔥 {trip.trailType}
                  </span>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-semibold mb-1">{trip.name}</h3>
                <p className="text-sm opacity-90 mb-2 text-gray-300">
                  {trip.region}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">
                    ₹{trip.price}
                  </span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-gray-300">
                    {trip.duration}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { TrendingTreks };

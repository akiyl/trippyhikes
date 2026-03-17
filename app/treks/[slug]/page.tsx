import Image from "next/image";
import { notFound } from "next/navigation";
import { getDestinationBySlug, getDestinations } from "@/lib/getDestination";
import TrekDetailMotion from "@/app/components/trekDetailsMotion";
import { Star, MapPin, Calendar, Mountain } from "lucide-react";
import SchedulePlannerClient from "@/app/components/SchedulePlanner";
type Props = {
  params?: Promise<{ slug: string | string[] }>;
};
export default async function TrekDetailPage({ params }: Props) {
  // Next's generated PageProps expects params to be a Promise-resolvable shape.
  // Accept either a Promise or a plain object and await it to get the slug.
  const resolved = await params;
  const rawSlug = Array.isArray(resolved?.slug)
    ? resolved?.slug[0]
    : resolved?.slug;
  if (!rawSlug) return notFound();
  const trek = await getDestinationBySlug(String(rawSlug));
  const destinations = await getDestinations();

  if (!trek) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      {/* HERO SECTION */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        <Image
          src={trek.imageSrc}
          alt={trek.name}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <TrekDetailMotion>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              {trek.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-gray-300 text-lg md:text-xl">
              <MapPin className="w-5 h-5 text-green-400" /> {trek.region}
            </p>
          </TrekDetailMotion>
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <TrekDetailMotion>
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-green-400">
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">{trek.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm md:text-base">
              <div className="bg-gray-800/40 p-4 rounded-xl">
                <Calendar className="inline-block w-5 h-5 mr-2 text-green-400" />
                <span className="font-semibold">Duration:</span> {trek.duration}
              </div>
              <div className="bg-gray-800/40 p-4 rounded-xl">
                <Mountain className="inline-block w-5 h-5 mr-2 text-green-400" />
                <span className="font-semibold">Max Altitude:</span>{" "}
                {trek.maxAltitude ? `${trek.maxAltitude} m` : "N/A"}
              </div>
              <div className="bg-gray-800/40 p-4 rounded-xl">
                <span className="font-semibold text-green-400">Grade:</span>{" "}
                {trek.grade}
              </div>
              <div className="bg-gray-800/40 p-4 rounded-xl">
                <span className="font-semibold text-green-400">Season:</span>{" "}
                {trek.season}
              </div>
            </div>
          </div>
        </TrekDetailMotion>

        {/* QUICK INFO */}
        <TrekDetailMotion>
          <div className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Trek Highlights</h3>
            <ul className="space-y-3 list-disc list-inside text-gray-300">
              {trek.trailType && <li>Trail Type: {trek.trailType}</li>}
              {trek.baseCamp && <li>Base Camp: {trek.baseCamp}</li>}
              {trek.pickupLocation && <li>Pickup: {trek.pickupLocation}</li>}
              {trek.dropLocation && <li>Drop: {trek.dropLocation}</li>}
              {trek.foodStay && <li>Food & Stay: {trek.foodStay}</li>}
            </ul>
            <p className="mt-6 text-xl font-bold text-green-400">
              Price: ${trek.price.toFixed(2)}
            </p>
          </div>
        </TrekDetailMotion>
      </section>

      {/* ITINERARY, COST, ESSENTIALS, REVIEWS */}
      {trek.trekItinerary && (
        <TrekDetailMotion>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-semibold mb-4 text-green-400">
              Trek Itinerary
            </h2>
            <p className="whitespace-pre-line text-gray-300 leading-relaxed">
              {trek.trekItinerary}
            </p>
          </section>
        </TrekDetailMotion>
      )}

      {trek.costTerms && (
        <TrekDetailMotion>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-semibold mb-4 text-green-400">
              Cost Terms
            </h2>
            <p className="whitespace-pre-line text-gray-300 leading-relaxed">
              {trek.costTerms}
            </p>
          </section>
        </TrekDetailMotion>
      )}

      {trek.trekEssentials && (
        <TrekDetailMotion>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-semibold mb-4 text-green-400">
              Trek Essentials
            </h2>
            <p className="whitespace-pre-line text-gray-300 leading-relaxed">
              {trek.trekEssentials}
            </p>
          </section>
        </TrekDetailMotion>
      )}

      {trek.Review && trek.Review.length > 0 && (
        <TrekDetailMotion>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-semibold mb-6 text-green-400">
              Trek Reviews
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {trek.Review.map((review: any) => (
                <div
                  key={review.id}
                  className="bg-gray-800/40 p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </TrekDetailMotion>
      )}
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col  items-center justify-center ">
        <SchedulePlannerClient destinations={destinations} />
        <button className=" w-[250px] h-[50px] px-1 py-2 bg-blue-400 text-white rounded-md  hover:bg-blue-500 transition">
          book now
        </button>
      </section>
    </div>
  );
}

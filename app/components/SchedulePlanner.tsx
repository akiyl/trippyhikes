"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Destination } from "@prisma/client";
import { CalendarDays, MapPin, Users } from "lucide-react";

type Props = {
  destinations: Destination[];
};

export default function SchedulePlannerClient({ destinations }: Props) {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ hotels: any[]; food: any[] }>({
    hotels: [],
    food: [],
  });

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResults({
        hotels: [
          { name: "Everest View Hotel", price: "₹2500/night" },
          { name: "Himalaya Lodge", price: "₹1800/night" },
        ],
        food: [
          { name: "Mountain Café", type: "Local Cuisine" },
          { name: "Trail Diner", type: "Fast Snacks" },
        ],
      });
      setLoading(false);
    }, 1000);
  }

  const toggleField = (field: string) => {
    setActiveField(activeField === field ? null : field);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 py-8 sm:px-10 mb-40 text-gray-800 max-w-3xl mx-auto"
    >
      {/* Icons Row */}
      <div className="flex justify-center sm:justify-between items-center gap-6 mb-6 flex-wrap">
        <button
          type="button"
          onClick={() => toggleField("destination")}
          className={`p-3 rounded-full border-2 transition-all ${
            activeField === "destination"
              ? "bg-blue-100 border-blue-500"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <MapPin className="w-6 h-6 text-gray-600" />
        </button>

        <button
          type="button"
          onClick={() => toggleField("dates")}
          className={`p-3 rounded-full border-2 transition-all ${
            activeField === "dates"
              ? "bg-blue-100 border-blue-500"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <CalendarDays className="w-6 h-6 text-gray-600" />
        </button>

        <button
          type="button"
          onClick={() => toggleField("people")}
          className={`p-3 rounded-full border-2 transition-all ${
            activeField === "people"
              ? "bg-blue-100 border-blue-500"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <Users className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Animated Fields */}
      <AnimatePresence>
        {activeField === "destination" && (
          <motion.div
            key="destination"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border rounded-xl px-4 py-3 bg-white shadow-sm mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Choose Destination
              </label>
              <select
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              >
                <option value="">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {activeField === "dates" && (
          <motion.div
            key="dates"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="border rounded-xl px-4 py-3 bg-white shadow-sm">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="border rounded-xl px-4 py-3 bg-white shadow-sm">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeField === "people" && (
          <motion.div
            key="people"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border rounded-xl px-4 py-3 bg-white shadow-sm mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Number of People
              </label>
              <input
                type="number"
                min={1}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full focus:outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition"
      >
        {loading ? "Searching..." : "Search Plans"}
      </button>

      {/* Results */}
      {!loading && results.hotels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-left"
        >
          <h3 className="font-semibold text-lg mb-2">Hotels</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {results.hotels.map((h, i) => (
              <li key={i}>
                {h.name} – {h.price}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg mt-4 mb-2">Food & Eateries</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {results.food.map((f, i) => (
              <li key={i}>
                {f.name} – {f.type}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </form>
  );
}

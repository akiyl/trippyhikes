"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const activitiesList = ["Hiking", "Camping", "Photography", "Wildlife"];

const activityToDestinationMap: Record<string, string[]> = {
  Hiking: ["Manali", "Kasol", "Uttarakhand"],
  Camping: ["Rishikesh", "Spiti"],
  Photography: ["Ladakh", "Zanskar"],
  Wildlife: ["Jim Corbett", "Kaziranga"],
};

export default function Planner() {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState<string[]>([]);
  const [destination, setDestination] = useState("");
  const [suggested, setSuggested] = useState<string[]>([]);

  const toggleActivity = (a: string) => {
    setActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  };

  const suggest = () => {
    const res = activities.flatMap((a) => activityToDestinationMap[a] || []);
    setSuggested([...new Set(res)]);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {/* COLLAPSED BAR */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white shadow-xl hover:scale-105 transition"
        >
          ✨ Plan your trip
        </motion.button>
      )}

      {/* EXPANDED PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="w-[90vw] sm:w-[500px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 text-white"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">AI Travel Planner ✨</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* ACTIVITIES */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activitiesList.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleActivity(a)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    activities.includes(a)
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            {/* AI BUTTON */}
            <button
              onClick={suggest}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 mb-4"
            >
              Suggest Destinations ✨
            </button>

            {/* SUGGESTIONS */}
            <div className="space-y-2 max-h-40 overflow-auto">
              {suggested.map((place) => (
                <div
                  key={place}
                  onClick={() => setDestination(place)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
                >
                  {place}
                </div>
              ))}
            </div>

            {/* DESTINATION */}
            <input
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-4 w-full p-3 rounded-xl bg-white/10 border border-white/10"
            />

            {/* CTA */}
            <button className="mt-4 w-full py-3 rounded-xl bg-white text-black font-semibold">
              Generate Plan 🚀
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

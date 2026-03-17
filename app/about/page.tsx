"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AboutPage() {
  // Cursor glow effect
  useEffect(() => {
    const move = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const stats = [
    { number: "500+", label: "Trekkers Guided" },
    { number: "30+", label: "Expeditions" },
    { number: "12+", label: "Years Experience" },
    { number: "100%", label: "Safety Focused" },
  ];

  return (
    <main className="bg-[#050b12] text-white overflow-hidden relative">
      {/* Cursor Glow */}

      <div
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full blur-[140px] opacity-30"
        style={{
          left: "var(--x)",
          top: "var(--y)",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle,#3b82f6,transparent)",
        }}
      />

      {/* HERO */}

      <section className="h-screen flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <h1 className="text-[60px] md:text-[110px] font-bold leading-[0.9] tracking-tight">
            WE ARE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              MOUNTAIN
            </span>
            <br />
            STORYTELLERS
          </h1>

          <p className="mt-8 text-gray-400 max-w-xl mx-auto text-lg">
            Every trail holds a story. Every summit transforms you. We guide
            explorers into the wild beauty of the Himalayas.
          </p>
        </motion.div>
      </section>

      {/* SVG MOUNTAIN SCENE */}

      <section className="py-32 flex justify-center">
        <div className="w-full max-w-5xl">
          <svg viewBox="0 0 800 400" className="w-full">
            {/* SUN */}

            <motion.circle
              cx="650"
              cy="80"
              r="35"
              fill="#60a5fa"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2 }}
            />

            {/* CLOUDS */}

            <motion.ellipse
              cx="200"
              cy="100"
              rx="60"
              ry="20"
              fill="white"
              opacity="0.2"
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <motion.ellipse
              cx="500"
              cy="140"
              rx="70"
              ry="22"
              fill="white"
              opacity="0.2"
              animate={{ x: [0, -40, 0] }}
              transition={{ duration: 14, repeat: Infinity }}
            />

            {/* MOUNTAINS */}

            <motion.path
              d="M0 300 L150 180 L260 260 L380 150 L520 280 L650 170 L800 300"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />

            <motion.path
              d="M0 320 L200 240 L340 290 L480 220 L620 300 L800 320"
              fill="none"
              stroke="#1e3a8a"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4 }}
            />
          </svg>
        </div>
      </section>

      {/* FLOATING TREK PHOTOS */}

      <section className="relative h-[600px] flex items-center justify-center">
        <motion.img
          src="/images/trek1.jpg"
          className="absolute w-72 rounded-xl shadow-2xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.img
          src="/images/trek2.jpg"
          className="absolute w-80 rounded-xl shadow-2xl left-10"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <motion.img
          src="/images/trek3.jpg"
          className="absolute w-72 rounded-xl shadow-2xl right-10"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* STATS */}

      <section className="py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-10 border border-white/10"
            >
              <h3 className="text-5xl font-bold text-blue-300">{s.number}</h3>

              <p className="text-gray-400 mt-3">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}

      <section className="py-40 text-center max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-10"
        >
          The Himalayan Philosophy
        </motion.h2>

        <p className="text-xl text-gray-300 leading-relaxed">
          The mountains teach patience, humility and courage. They remind us
          that the journey matters more than the summit. We simply create the
          path — the mountains do the rest.
        </p>
      </section>

      {/* CTA */}

      <section className="py-32 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-5xl font-bold mb-8"
        >
          Ready For Your Next Adventure?
        </motion.h2>

        <p className="text-gray-400 mb-10">
          Explore breathtaking Himalayan treks.
        </p>

        <motion.a
          href="/treks"
          whileHover={{ scale: 1.1 }}
          className="px-10 py-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold"
        >
          Explore Treks
        </motion.a>
      </section>
    </main>
  );
}

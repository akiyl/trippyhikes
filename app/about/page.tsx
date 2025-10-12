"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Mountain, Compass, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
        <Image
          src="/image/guides/bg-about.jpeg"
          alt="Hero Mountain View"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Your Journey. Our Passion.
          </motion.h1>
          <p className="text-gray-300 mt-4 text-lg">
            Explore. Conquer. Connect with the mountains.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
            Our Story
          </h2>
          <p className="text-gray-400 leading-relaxed">
            What started as a small group of trekkers exploring the Himalayas
            turned into a mission to share the beauty of nature with the world.
            Trek Adventures brings together passion, adventure, and community —
            inspiring thousands to step into the wild.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/image/guides/mountains-9223041.jpg"
            alt="Our Story"
            width={600}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            To connect people with the great outdoors through responsible
            adventure travel, promoting sustainability, and supporting local
            mountain communities.
          </p>
        </div>
      </section>

      {/* Why Trek With Us */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          Why Trek With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <Mountain className="w-8 h-8 text-blue-400" />,
              title: "Experienced Guides",
              desc: "Trek safely with certified, passionate experts.",
            },
            {
              icon: <Compass className="w-8 h-8 text-blue-400" />,
              title: "Sustainable Travel",
              desc: "Leave only footprints, preserve nature.",
            },
            {
              icon: <Users className="w-8 h-8 text-blue-400" />,
              title: "Community Focused",
              desc: "Empowering local cultures and traditions.",
            },
            {
              icon: <Star className="w-8 h-8 text-blue-400" />,
              title: "Unforgettable Memories",
              desc: "Crafting experiences that last a lifetime.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-xl shadow-md p-6 text-center hover:shadow-blue-500/30 transition-shadow"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet The Team */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                name: "santosh serpa",
                role: "Lead Guide",
                img: "/image/guides/santosh.jpeg",
              },
              {
                name: "harish dai",
                role: "Expedition Expert",
                img: "/image/guides/hrish.webp",
              },
              {
                name: "sagar lama",
                role: "Travel Planner",
                img: "/image/guides/sagr.jfif",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 text-center bg-gradient-to-r from-blue-700 to-blue-500">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Next Adventure
        </h2>
        <p className="text-gray-200 mb-8">
          Join thousands of explorers discovering the most breathtaking treks
          around the world.
        </p>
        <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-200 transition">
          Book Now
        </button>
      </section>
    </main>
  );
}

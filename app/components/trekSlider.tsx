"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import type { Destination } from "@prisma/client";

const TrekSliderGSAP = () => {
  const [index, setIndex] = useState(0);
  const [treks, setTreks] = useState<Destination[]>([]);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const response = await fetch("/api/destinations");
        const data: Destination[] = await response.json();
        setTreks(data);
      } catch (error) {
        console.error("[TrekSliderGSAP] Failed to load destinations:", error);
      }
    };

    loadDestinations();
  }, []);

  const animateSlide = (newIndex: number, direction: number) => {
    const current = slidesRef.current[index];
    const next = slidesRef.current[newIndex];

    if (!current || !next) return;

    const tl = gsap.timeline();

    gsap.set(next, { zIndex: 2, opacity: 1 });
    gsap.set(current, { zIndex: 1 });

    tl.to(current, {
      opacity: 0,
      x: direction * -50,
      duration: 0.8,
      ease: "power3.inOut",
    })
      .fromTo(
        next,
        { opacity: 0, x: direction * 50, scale: 1.1 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .fromTo(
        next.querySelectorAll(".text-anim"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );
  };

  const nextSlide = () => {
    if (treks.length === 0) return;
    const newIndex = (index + 1) % treks.length;
    animateSlide(newIndex, 1);
    setIndex(newIndex);
  };

  const prevSlide = () => {
    if (treks.length === 0) return;
    const newIndex = index === 0 ? treks.length - 1 : index - 1;
    animateSlide(newIndex, -1);
    setIndex(newIndex);
  };

  useEffect(() => {
    if (treks.length <= 1) return;

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, treks.length]);

  if (treks.length === 0) {
    return (
      <section className="relative w-full h-screen bg-black text-white flex items-center justify-center">
        <p>Loading trek images...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden text-white">
      {treks.map((trek, i) => (
        <div
          key={trek.id}
          ref={(el) => {
            if (el) slidesRef.current[i] = el;
          }}
          className={`absolute inset-0 ${
            i === index ? "opacity-1 z-10" : "opacity-0"
          }`}
        >
          <img
            src={trek.imageSrc || ""}
            alt={trek.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 h-full flex items-center px-25 pt-35 ">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-anim text-4xl md:text-6xl font-light">
                {trek.name}
              </h2>

              <p className="text-anim text-lg text-gray-300">
                <span className="text-white">Duration:</span> {trek.duration}
              </p>

              <p className="text-anim text-lg text-gray-300">
                <span className="text-white">Region:</span> {trek.region}
              </p>

              <p className="text-anim flex items-center gap-2 text-gray-300">
                <MapPin size={18} />
                {trek.region}
              </p>

              <Link
                href={`/treks/${trek.slug}`}
                className="text-anim mt-4 px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
              >
                View Trek Details
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 bg-white/20 p-3 rounded-full backdrop-blur-md hover:bg-white/40"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full backdrop-blur-md hover:bg-white/40"
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default TrekSliderGSAP;

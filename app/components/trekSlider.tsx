"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import type { Destination } from "@prisma/client";

type TrekSliderProps = {
  destinations?: Destination[];
};

const TrekSliderGSAP = ({ destinations }: TrekSliderProps) => {
  const [index, setIndex] = useState(0);
  const [treks, setTreks] = useState<Destination[]>(destinations ?? []);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (destinations) {
      setTreks(destinations);
      return;
    }

    const loadDestinations = async () => {
      try {
        const response = await fetch("/api/destinations");
        const data: Destination[] = await response.json();
        setTreks(data.slice(0, 7));
      } catch (error) {
        console.error("[TrekSliderGSAP] Failed to load destinations:", error);
      }
    };

    loadDestinations();
  }, [destinations]);

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

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
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
      <section className="relative w-full min-h-[70vh] bg-black text-white flex items-center justify-center px-4 py-10">
        <p>Loading trek images...</p>
      </section>
    );
  }

  return (
    <section
      className="relative w-full min-h-[80vh] sm:min-h-[85vh] bg-black overflow-hidden text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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

          <div className="relative z-10 h-full flex items-center px-4 py-14 sm:px-6 lg:px-16">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
                {trek.name}
              </h2>

              <p className="text-anim text-base sm:text-lg text-gray-300">
                <span className="text-white">Duration:</span> {trek.duration}
              </p>

              <p className="text-anim text-base sm:text-lg text-gray-300">
                <span className="text-white">Region:</span> {trek.region}
              </p>

              <p className="text-anim flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                <MapPin size={18} />
                {trek.region}
              </p>

              <Link
                href={`/treks/${trek.slug}`}
                className="text-anim mt-4 inline-block rounded-lg border border-white px-5 py-3 text-sm sm:text-base transition hover:bg-white hover:text-black"
              >
                View Trek Details
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-md transition hover:bg-white/40 sm:left-6"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-md transition hover:bg-white/40 sm:right-6"
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default TrekSliderGSAP;

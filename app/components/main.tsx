"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageLayout from "./explore";
import TrekSliderGSAP from "./trekSlider";

gsap.registerPlugin(ScrollTrigger);

export default function NewHome() {
  const words = ["EXPERIENCE", "TRAVEL", "EXPLORE"];
  const textEl = useRef<HTMLSpanElement | null>(null);
  const heroImage = useRef(null);
  const storySection = useRef(null);
  const horizontal = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    swapLoop();
  }, []);

  function swapLoop() {
    const oldWord = words[indexRef.current];
    indexRef.current = (indexRef.current + 1) % words.length;
    const newWord = words[indexRef.current];

    const el = textEl.current;
    if (!el) return;

    // Animate old word up & fade a bit
    gsap.to(el, {
      y: -60,
      opacity: 0,
      duration: 0.55,
      ease: "power3.in",
      onComplete: () => {
        // Set new word instantly (reset position at bottom)
        el.innerText = newWord;
        gsap.set(el, { y: 40, opacity: 0 });

        // Animate new word up into place
        gsap.to(el, {
          y: -15,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => {
            // Loop with delay
            gsap.delayedCall(5, swapLoop);
          },
        });
      },
    });
  }

  useEffect(() => {
    // HERO ZOOM
    gsap.fromTo(
      heroImage.current,
      { scale: 1.4 },
      { scale: 1, duration: 3, ease: "power3.out" },
    );

    // TEXT REVEAL
    gsap.utils.toArray(".reveal").forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
      });
    });

    // IMAGE REVEAL
    gsap.utils.toArray(".imageReveal").forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        scale: 1.3,
        opacity: 0,
        duration: 1.5,
      });
    });

    // PINNED STORY
    gsap.to(".storyText", {
      scrollTrigger: {
        trigger: storySection.current,
        start: "top top",
        end: "2000px",
        scrub: true,
        pin: true,
      },
      y: -200,
    });

    // HORIZONTAL SCROLL
    gsap.to(horizontal.current, {
      x: "-200%",
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontalSection",
        start: "top top",
        end: "2000px",
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <main className="text-[#1a1a1a]">
      <div ref={heroImage} className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <video
            autoPlay
            muted
            loop
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 flex min-h-[70vh] items-center px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
          <div className="max-w-6xl text-white">
            <div className="mb-6 text-sm uppercase tracking-[0.45em] text-blue-100/80">
              Adventure Awaits
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
              <span className="block">{words[0]}</span>
              <span className="block">THE</span>
              <span className="block">HIMALAYAS</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-100/90 leading-8">
              Discover immersive treks, unforgettable camps, and curated
              wilderness journeys built to fit every traveler.
            </p>
          </div>
        </div>
      </div>

      <ImageLayout />

      <section className="bg-slate-900 text-white w-full px-4 py-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <h2 className="text-4xl sm:text-5xl font-semibold">Why us?</h2>
            <p className="mt-4 max-w-3xl text-base sm:text-lg leading-8 text-slate-300">
              It’s not just about the place; it’s about the experience. We
              design every journey to be inspiring, safe, and deeply memorable.
            </p>
          </div>

          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-8">
            <p>
              We craft adventures that become unforgettable journeys along your
              memory lane. From snow-covered peaks to lush, vibrant valleys, we
              guide you every step of the way with care and expertise.
            </p>
            <p>
              Each experience is thoughtfully designed to connect you with
              nature, inspire a sense of wonder, and create lasting memories
              long after the trek ends.
            </p>
          </div>
        </div>
      </section>

      <TrekSliderGSAP />
    </main>
  );
}
